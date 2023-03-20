import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Api, { IMG_SERVER } from "../utils/customAPI";
import ProductItem from '../components/product/ProductItem';
import { changePriceFormat } from '../_actions/product_action';
import AddCart from '../components/product/AddCart';
import { useSelector } from 'react-redux';


export default function HomeMobile(props) {
  const user = useSelector(state => state.user);
  const [recipes, setRecipes] = useState()
  const [saveMoney, setSaveMoney] = useState()
  const [saveEco, setSaveEco] = useState()
  const [banner,setBanner] = useState();
  const [newList, setNewList] = useState();
  const [cartItem, setCartItem] = useState();
  const [showCart, setShowCart] = useState(false)
  const [usboxItems, setUsboxItems] = useState()
  const getBanner = async () => {
    const request = await Api.get('/api/v1/pop_banner', {params: {pbMode:'MOBILE',pbSite:'PS02',pbepPath:'https://m.yes-us.co.kr'}})
    const request2 = await Api.get('/api/v1/pop_banner',{ params:{pbMode:'ALL',pbSite:'PS02',pbepPath:'https://yes-us.co.kr'}})
    if(request.data.result) setBanner(request.data.result);
    if(request2.data.result && request2.data.result.find(item => item.pbId === '171')) setUsboxItems(request2.data.result.find(item => item.pbId === '171').popBannerPopupSlideList);
    console.log(request2.data.result.find(item => item.pbId === '171').popBannerPopupSlideList);
  }
  const getList = async () => {
    const body = {pageIndex: 1,sortType: 'best'  }
    const request = await Api.get('/api/v1/app/product/getProductInfo',body)
    setNewList(request.data.result)
  }
  const getRecipe = async () => {
    const request = await Api.get('/api/v1/earth/recipe/mainForMobile')
    setRecipes(request.data.result);
  }
  const getSaveInfo = async () => {
    const request = await Api.get('/api/v1/saveEarth/getSaveEarthMainData')
    setSaveMoney(request.data.result.earthBoxWeekPrice.savePrice);
    setSaveEco(request.data.result.carbonReduction.kgCO2eq);
  }
  useEffect(() => {
    getRecipe()
    getSaveInfo()
    getList()
    getBanner()
  },[])
  return(
  <div id="contents" className="main">
    <section className="main_visual">
      <Swiper className="vis_wrap">
        {banner && banner.length > 0 ?<>
          {banner.popBannerPopupSlideList.length > 0 && banner.popBannerPopupSlideList.map(slide =>
            <SwiperSlide key={slide.pbbsId} style={{ backgroundImage: `url(${IMG_SERVER}${slide.pbbsPcImagePath})` }}>
              <div style={{ backgroundImage: `url(${IMG_SERVER}${slide.pbbsMobileImagePath})` }} 
              dangerouslySetInnerHTML={{ __html: slide.pbbsContents }}></div>
              <Link to={slide.pbbsLinkUrl} className="full_link" target={slide.pbbsNewTabUsedYn ==='Y' ? '_self': '_blank'}></Link>
            </SwiperSlide>
          )}
        </>
        : <SwiperSlide style={{backgroundImage: `url(//all-to-delicious.s3.ap-northeast-2.amazonaws.com/atd/a2dcorp.co.kr/pop_banner/images/20220704/25f04d2bd54d4d39a8159f0100f245d4.png)`}}>
          <div className="text bk" style={{backgroundImage: `url('//all-to-delicious.s3.ap-northeast-2.amazonaws.com/atd/a2dcorp.co.kr/pop_banner/images/20220526/81b4ff2339734ce2915d7a2fbac77631.png')`}}>
            <h3><small>#ZERO WASTE #LOW PRICE #LESS STRESS</small>
              지구를 살리는<br />
              장보기의 시작,<br /><span className="fcg">예스어스 어스박스</span>
            </h3>
            <p className="fs20">지금 정기구독시,<br />최대 1,000원 바로 할인</p>
          </div>
          <Link to="https://yes-us.co.kr/product/surl/22" className="full_link" target="_self"></Link>
        </SwiperSlide>
        }
      </Swiper>
    </section>
    {usboxItems?.length > 0 && <section className="main_usbox">
      <div className="main_header">
          <h2>이번 주 어스박스 채소 미리보기</h2>
          <p>이번 어스박스에는 어떤 채소들이 함께할지 미리 확인해보세요!</p>
      </div>
      {usboxItems?.length > 6 ?
      <Swiper className="usbox-swiper">
        {usboxItems.map(item => <SwiperSlide key={item.id}>
          <Link to={user.username ? '/myshop':'/usbox/subscribe'}>
            <b className="thumb" style={{backgroundImage:`url(${item.pbpsImagePath})`}} ></b>
            {item.pbpsTitle}
          </Link>
        </SwiperSlide>)}
      </Swiper>
      : <div  className="usbox-swiper"><div className="swiper-wrapper">
      {usboxItems.map(item => <div className="swiper-slide" key={item.id}><Link to={user.username ? '/myshop':'/usbox/subscribe'}>
        <b className="thumb" style={{backgroundImage:`url(${item.pbpsImagePath})`}} ></b>
        {item.pbpsTitle}
      </Link></div>)}
    </div></div>}
    </section>}
    <section className="main_prd">
      <div className="main_header">
        <h2>신선함 가득, 산지직송 농산물</h2>
        <p>작은 흠집, 다양한 모양, 판로가 부족해<br />버려질 위기에 처한 우리 농산물을 구해요</p>
      </div>
      {newList && <div className="main_prd_list">
        <h3>#NEW <Link to="/category/%EB%8B%A8%ED%92%88/25/" className="main_more">더보러 가기</Link></h3>
          <Swiper
            spaceBetween={15}
            slidesPerView={2}
            breakpoints={{
              720: {
                slidesPerView: 3,
                spaceBetween: 30
              },
            }}
            className="categoryList"
          >
          {newList.map(item =>
          <SwiperSlide key={item.productId}><ProductItem item={item} setCartItem={setCartItem} setShowCart={setShowCart}/></SwiperSlide>
          )}
          </Swiper>
      </div>}
      {newList?.filter(item => item.productGubun !== '랜덤박스').length > 0 && <div className="main_prd_list">
        <h3>#BEST <Link to="/category/%EB%8B%A8%ED%92%88/25/" className="main_more">더보러 가기</Link></h3>
        <Swiper
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            720: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          }}
          className="categoryList"
        >
        {newList.filter(item => item.productGubun !== '랜덤박스').map(item =>
          <SwiperSlide key={item.productId}><ProductItem item={item} setCartItem={setCartItem} setShowCart={setShowCart}/></SwiperSlide>
        )}
        </Swiper>
      </div>} 
      {cartItem && <AddCart setShowCart={setShowCart} showCart={showCart} cartItem={cartItem}/>}
    </section>
    <section className="main_brand">
      <div className="main_header">
        <h2>YES2020</h2>
        <p>상생으로 농가와 소바자를 잇는<br /> 예스어스의 운영원칙</p>
        <Link to="/shopinfo/brand.html" className="main_more">자세히 보기</Link>
      </div>
      <Swiper
        spaceBetween={30}
          breakpoints={{
          1040: {
            slidesPerView: 3,
          },
        }}
        >
        <SwiperSlide style={{backgroundImage: `url('https://yes-us.co.kr/web/upload/yesus/m_n_main_img_save.png')`}}><Link to="/save_earth" >
          <small>#we save Money</small>
          <b>이번주 어스박스 장보기로<br /> 절약 가능한 금액 <span className="bgy saveMoney">{changePriceFormat(saveMoney)}원</span></b>
        </Link></SwiperSlide>
        <SwiperSlide  style={{backgroundImage: `url('https://yes-us.co.kr/web/upload/yesus/m_n_main_img_nong.png')`}}><Link to="/wesave">
          <small>#we save Farm</small>
          <b>우리가 함께 구한<br /><span className="bgy">당근밭, 감자밭, 무밭</span></b>
        </Link></SwiperSlide>
        <SwiperSlide style={{backgroundImage: `url('https://yes-us.co.kr/web/upload/yesus/m_n_main_img_tree.gif')`}} ><Link to="/save_earth">
          <small>#we save the Earth</small>
          <b>우리가 함께 절감한<br />온실가스 <span className="bgy saveEco">{changePriceFormat(saveEco)}CO2e</span></b>
        </Link></SwiperSlide>
      </Swiper>
    </section>
    <section className="main_muckvti"><a href="/mukbti_v2/index.html#/" target="_blank">
      <b>먹비티아이 테스트</b>
      <span>취향저격 채소 &amp; 레시피 추천</span>
      <small className="main_more">테스트하러 가기</small>
    </a></section>
    <section className="main_recipe">
      <div className="main_header">
        <h2>예스어스 레시피</h2>
        <p>친환경 채소들로 만드는 건강한 한끼</p>
        <Link to="/recipe/all.html" className="main_more">더 보러 가기</Link>
      </div>
      <div className="recipe_list">
        <ul>
          {recipes?.filter((item,index) => index < recipes.length / 2 ).map((item,index) => <li key={item.recipeId}><Link to={`/recipe/${item.recipeId}`}>
            <img src={`//all-to-delicious.s3.ap-northeast-2.amazonaws.com/${item.recipeRepImageUrl}`} />
            <span className="info"><small><b>난이도</b> {item.recipeDifficult}</small> <small><b>소요시간</b> {item.recipeCookingTime}</small></span>
            <strong className="title" dangerouslySetInnerHTML={{ __html: item.recipeTitle }}></strong>
            <span className="summary">{item.recipeSummary}</span>
          </Link></li>)}
        </ul>
        <ul>
            <li className="tags"><strong className="fcg">#오늘도맛있게<br />#구출완료</strong></li>
            {recipes?.filter((item,index) => index >= recipes.length / 2 ).map((item,index) => <li key={item.recipeId}><Link to={`/recipe/${item.recipeId}`}>
              <img src={`//all-to-delicious.s3.ap-northeast-2.amazonaws.com/${item.recipeRepImageUrl}`} />
              <span className="info"><small><b>난이도</b> {item.recipeDifficult}</small> <small><b>소요시간</b> {item.recipeCookingTime}</small></span>
              <strong className="title" dangerouslySetInnerHTML={{ __html: item.recipeTitle }}></strong>
              <span className="summary">{item.recipeSummary}</span>
            </Link></li>
            )}
        </ul>
        <ul>
            {recipes?.filter((item,index) => index === 2 || index === 5 ).map((item,index) => <li key={item.recipeId}><Link to={`/recipe/${item.recipeId}`}>
              <img src={`//all-to-delicious.s3.ap-northeast-2.amazonaws.com/${item.recipeRepImageUrl}`} />
              <span className="info"><small><b>난이도</b> {item.recipeDifficult}</small> <small><b>소요시간</b> {item.recipeCookingTime}</small></span>
              <strong className="title" dangerouslySetInnerHTML={{ __html: item.recipeTitle }}></strong>
              <span className="summary">{item.recipeSummary}</span>
            </Link></li>
            )}
        </ul>
      </div>
    </section>
    <section className="main_notice">
      <div className="main_header">
        <h2>예스어스 최신소식</h2>
        <Link to="/board/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD/1/" className="main_more">더 보러 가기</Link>
      </div>
      <ul className="xans-element- xans-board xans-board-list-1 xans-board-list xans-board-1">
        <li className="xans-record-"><Link to="/article/공지사항/1/1583/">[알림] 4월 리뷰 이벤트 당첨자 발표</Link></li>
        <li className="xans-record-"><Link to="/article/공지사항/1/1279/">[알림] 3월 리뷰 이벤트 당첨자 발표</Link></li>
      </ul>
    </section>
  </div>
  )
}
