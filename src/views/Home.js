import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import Api, { IMG_SERVER } from "../utils/customAPI";

const { Panel } = Collapse;

export default function Home(props) {
  const banner = useSelector(state => state.shop.banner);
  const [saveEarth, setSaveEartch] = useState({
    earthBoxWeekPrice: { savePrice: 0 },
    carbonReduction: { kgCO2eq: 0 }
  });
  const setMoney = (money) => {
    return new Intl.NumberFormat().format(parseInt(money))
  }
  const fetchData = async () => {
    const request = await Api.get('/saveEarth/getSaveEarthMainData')
    setSaveEartch(request.data.result)
  }
  useEffect(() => {
    if(saveEarth.carbonReduction.kgCO2eq === 0) fetchData()
  }, [])
  return (
    <div id="contents" className="main">
      {banner.length > 0 ? <div className="mainVisual">
        {banner.find(banner => banner.pbbPosition === 'BP02').pbSlideUsedYn === 'Y' ?
          <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4400,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {banner.find(banner => banner.pbbPosition === 'BP02').popBannerBannerSlideList && banner.find(banner => banner.pbbPosition === 'BP02').popBannerBannerSlideList.map((banner, index) =>
              <SwiperSlide style={{ backgroundImage: `url(${IMG_SERVER}${banner.pbbsPcImagePath})` }} key={index}>
                <img src={`${IMG_SERVER}${banner.pbbsMobileImagePath}`} alt="" />
                <div className="banner-text" dangerouslySetInnerHTML={{ __html: banner.pbbsContents }}></div>
                {banner.pbbsNewTabUsedYn === 'Y' ?
                <a href={banner.pbbsLinkUrl} className="vis_full_link" target="_blank" rel="noreferrer">
                  <span className="vis_link">{banner.pbbsTitle}</span>
                </a>
                :
                <Link to={banner.pbbsLinkUrl} className="vis_full_link">
                  <span className="vis_link">{banner.pbbsTitle}</span>
                </Link>
                }
              </SwiperSlide>
            )}
          </Swiper>
          :
          <div className="swiper">
            {banner.find(banner => banner.pbbPosition === 'BP02').popBannerBannerSlideList && banner.find(banner => banner.pbbPosition === 'BP02').popBannerBannerSlideList.map((banner, index) =>
              <div style={{ backgroundImage: `url(${IMG_SERVER}${banner.pbbsPcImagePath})` }} key={index} className="swiper-slide" >
                <img src={`${IMG_SERVER}${banner.pbbsMobileImagePath}`} alt="" />
                <div className="banner-text" dangerouslySetInnerHTML={{ __html: banner.pbbsContents }}></div>
              </div>
            )}
          </div>
        }
      </div>
        :
        <div className="mainVisual">
          <div className="swiper">
            <div className="swiper-slide" style={{ backgroundImage: `url('${IMG_SERVER}atd/a2dcorp.co.kr/pop_banner/images/20220413/77bc4e802b9e43ee9cb9eccca535dea8.jpg')` }}>
              <img src="https://all-to-delicious.s3.ap-northeast-2.amazonaws.com/atd/a2dcorp.co.kr/pop_banner/images/20220413/996a0869b005458dad15ffadf39ab3e0.jpg" alt="" />
              <div className="banner-text"><div>
                <h3>지금 <span className="fcy">정기구독 신청</span>시 <br />최대 <span className="fcy">1,000원 즉시 할인</span>혜택 제공!</h3>
                <p className="fs20">지구를 살리는 장보기의 시작, 예스어스</p>
                <a href="/product/어스박스-친환경-못난이-채소-랜덤박스/22/category/24/display/1/" className="vis_link h_bgy">어스박스 구매하기</a>
                <a href="/product/어스박스-친환경-못난이-채소-랜덤박스/22/category/24/display/1/" className="vis_full_link">어스박스 구매하기</a>
              </div></div>
            </div>
          </div>
        </div>
      }
      <div className="main_wrap save_flex">
        <h2 className="sec_tit">We Save 챌린지</h2>
        <div className="inner">
          <div className="save_box jang_box">
            {saveEarth && <strong>
              이번주 어스박스 장보기로 <br /><span className="fcg jang_won">{setMoney(saveEarth.earthBoxWeekPrice.savePrice)}원</span>을 <br />
              절약할 수 있어요
            </strong>}
            <Link to="/shopinfo/brand#week_save">We Save #장보기 〉</Link>
          </div>
          <div className="save_box tan_box">
            {saveEarth && <strong>
              지금까지 여러분과 <br /><span className="fcg tan_g">{setMoney(saveEarth.carbonReduction.kgCO2eq)}kgCO2e</span>의 <br />
              온실가스를 절감헀어요
            </strong>}
            <Link to="/save_earth">We Save #지구 〉</Link>
          </div>
        </div>
      </div>
      <div className="main_wrap proccess">
        <h2 className="sec_tit">예스어스에서 시작하는<br /> 정말 쉬운 가치소비
          <br /><Link to="/shopinfo/brand" className="bk_wbox">YES2020 바로가기</Link></h2>
        <ul className="inner">
          <li className="step1"><strong>20%비싸게 사서<br />농가수익을 지켜요</strong></li>
          <li className="step2"><strong>산지 직송으로<br />유통마진을 줄여요</strong></li>
          <li className="step3"><strong>20%저렴하게<br />친환경 농산물을 만나요</strong></li>
        </ul>
      </div>
      <div className="main_wrap recommend">
        <h2 className="sec_tit">취향 분석부터 레시피까지<br /> 예스어스의 어스박스 하나로 끝
          <br /><Link to="/product/22" className="bk_wbox">어스박스 보러가기</Link></h2>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide><Link to="/mukbti">
            <span className="numb">01</span>
            <img src="//yes-us.co.kr/web/upload/yesus/main_m04_01.png" alt="먹비티아이" />
            <span className="txt_box">
              <strong className="fs26">먹비티아이로 분석하는 나의 취향</strong>
              <span>나의 평소 식습관으로 먹비티아이 AI가<br />추천하는 취향저격 채소들과 레시피를 만나요!</span>
              <small>먹비티아이 테스트하러 가기 &gt;</small>
            </span>
          </Link></SwiperSlide>
          <SwiperSlide><a href="/product/22">
            <span className="numb">02</span>
            <img src="//yes-us.co.kr/web/upload/yesus/main_m04_02.png" alt="어스박스" />
            <span className="txt_box">
              <strong className="fs26">매주 다채로운 나만의 어스박스</strong>
              <span>매주 친환경 못난이 채소를<br />내 맘대로 선택하고 구성합니다</span>
              <small>추천 채소 확인하기 &gt;</small>
            </span>
          </a></SwiperSlide>
          <SwiperSlide><a href="/recipe">
            <span className="numb">03</span>
            <img src="//yes-us.co.kr/web/upload/yesus/main_m04_03.png" alt="레시피" />
            <span className="txt_box">
              <strong className="fs26">어스박스 200%활용! 추천레시피</strong>
              <span>AI가 어스박스와 취향분석을 기반으로<br />다양한 레시피를 추천합니다</span>
              <small>추천 레시피 확인하기 &gt;</small>
            </span>
          </a></SwiperSlide>
        </Swiper>
      </div>
      <div className="main_wrap lineup">
        <h2 className="sec_tit">지금 제철인 농산물 라인업<br />
          <a href="/products" className="h_bgy bk_wbox">단품 상품보기</a></h2>
        <div className="inner">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            slidesPerGroup={2}
            loop={true}
            autoplay={{
              delay: 4400,
              disableOnInteraction: false,
            }}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
          >
            <SwiperSlide><a href="/product/35">
              <img src="https://yes-us.co.kr/web/product/medium/202202/b1aac22d59ff4b8ae2076b24fb2e496b.jpg" id="" alt="[단품] 제주도 흙당근 (2kg/5kg/10kg)" />
              <span className="detail">
                <strong>제주도 흙당근 (2kg/5kg/10kg)</strong>
                <span className="price">4,000원</span>
              </span>
            </a></SwiperSlide>
            <SwiperSlide><a href="/product/30">
              <img src="https://yes-us.co.kr/web/product/medium/202112/75905ab7db5da49f96d25a740be7c879.jpeg" id="" alt="[단품] 예산 유기농 못난이 신고배 7.5kg" />
              <span className="detail">
                <strong>예산 유기농 못난이 신고배 7.5kg</strong>
                <span className="price">42,900원</span>
                <span className="fcg">10% </span>
                <em>47,900원</em>
              </span>
            </a></SwiperSlide>
            <SwiperSlide><a href="/product/39">
              <img src="https://yes-us.co.kr/web/product/medium/202203/72ac6b1e2d3c0816da886beb85bdc88e.jpg" id="eListPrdImage39_2" alt="[단품] 영천 유기농 못난이 사과 3kg/5kg" />
              <span className="detail">
                <strong>영천 유기농 못난이 사과 3kg/5kg</strong>
                <span className="price">29,000원</span>
              </span>
            </a></SwiperSlide>
            <SwiperSlide><a href="/product/38">
              <img src="https://yes-us.co.kr/web/product/medium/202203/20974d7e6e56a0f2b90b484a57e7139f.jpg" id="eListPrdImage38_2" alt="[단품] 밀양 친환경 못난이 햇감자 5kg" />
              <span className="detail">
                <strong>밀양 친환경 못난이 햇감자 5kg</strong>
                <span className="price">10,000원</span>
              </span>
            </a></SwiperSlide>
            <SwiperSlide><a href="/product/37">
              <img src="https://yes-us.co.kr/web/product/medium/202203/20974d7e6e56a0f2b90b484a57e7139f.jpg" id="eListPrdImage38_2" alt="[단품] 합천 친환경 못난이 토마토 5kg" />
              <span className="detail">
                <strong>합천 친환경 못난이 토마토 5kg</strong>
                <span className="price">10,000원</span>
              </span>
            </a></SwiperSlide>
            <SwiperSlide><a href="/product/35">
              <img src="https://yes-us.co.kr/web/product/medium/202202/b1aac22d59ff4b8ae2076b24fb2e496b.jpg" id="eListPrdImage35_2" alt="[단품] 제주도 흙당근 (2kg/5kg/10kg)" />
              <span className="detail">
                <strong>제주도 흙당근 (2kg/5kg/10kg)</strong>
                <span className="price">4,000원</span>
              </span>
            </a></SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="bann_line bann_02"><a href="/product/22" className="inner">
        <strong className="ban_l_txt">아직 고민 되시나요?<br />어떤 구성인지 미리 경험해보세요!</strong>
        <span className="ban_r_txt">어스박스 구매하기 &gt;</span>
      </a></div>
      <div className="main_qna inner">
        <h2 className="sec_tit">궁금한 점이 있으신가요?<br />
          <a href="/faq" className="bk_wbox">FAQ 바로가기</a>
        </h2>
        <Collapse ghost expandIconPosition={'right'} className="inner">
          <Panel header={''} key="1" extra={<>저희는 4인 가족인데, <span className=" bgy">사이즈를 선택</span>할 수 있나요?</>}>
            <p>예스어스의 어스박스 사이즈는 2가지예요. <br /><strong>1-2인 가구라면 3kg 용량의 온리원박스를 </strong>,<br /><strong>2-4인 가구라면 5kg 용량의 투게더박스</strong>를 추천합니다.</p>
          </Panel>
          <Panel header={''} key="2" extra={<>지난 주에 받은 채소를 다 <span className="bgy">소진하지 못했어요.</span></>}>
            아직 채소가 남아 있다면, 배송주기를 변경해보세요. <br /><strong>1. [마이페이지]&gt;<a href="/myshop/regular_delivery" alt="정기배송관리 바로가기" className="fcb">[정기배송관리]</a>&gt;[상세조회]를 선택합니다. <br />
              2. [다음배송일]을 변경해 다음 회차를 건너뛸 수 있습니다. </strong><br />
            알맞은 주기를 설정해 알뜰한 식탁을 완성해보세요.
          </Panel>
          <Panel header={''} key="3" extra={<>채소는 <span className="bgy">어떤 기준</span>으로 선정되나요?</>}>
            예스어스의 채소박스에 구성되는 못난이 농산물은 <br />
            친환경 인증을 받은 품목들로 구성하고 있어요. <br /><strong>매주 혹은 매달 재배되는 농작물에 따라 <br />
              박스가 다양하게 구성</strong>되어 만나볼 수 있습니다.
          </Panel>
          <Panel header={''} key="4" extra={<><span className="bgy">못 먹는 채소</span>가 있어요.</>}>
            못 먹는 채소가 있다면 ‘못 먹는 채소’를 입력해보세요. <br />
            채소 정보를 반영하여 회원의 채소박스를 구성합니다. <br /><strong>‘못 먹는 채소’는 [마이페이지]&gt;<a href="/member/modify" alt="회원정보 바로가기" className="fcb">[회원정보]</a>에서
              언제든지 수정할 수 있습니다.</strong>
          </Panel>
          <Panel header={''} key="5" extra={<><span className="bgy">정기구독은 부담</span>스러워서 한 번만 해보고 싶어요.</>}>
            정기결제가 부담스럽다면 한 번 구매를 추천해드려요. <br /><strong>예스어스 상품 페이지에서 ‘1회 구매’선택 시 한 번만 구매가 가능합니다. </strong><br />
            랜덤박스와 AI추천레시피 서비스를 미리 경험해보세요.
          </Panel>
        </Collapse>
      </div>
      {/* <div className="main_blog_list">
        <h2 className="sec_tit">예스어스의 다양한 소식을 만나보세요<br />
          <a href="/board/blog/8/" className="bk_wbox h_bgy">블로그 바로가기</a></h2>
        <div className="inner">
          <div className="blog_item"><a href="/article/예스어스-블로그/8/353/">
            <img src="https://yes-us.co.kr/file_data/g9intable/gallery/2021/12/16/3149573f3f57d8de027a243e951e6f4c.jpg" alt="이걸로 한 끼 끝! 표고버섯무밥 썸네일" />
            <strong>이걸로 한 끼 끝! 표고버섯무밥</strong>
          </a></div>
          <div className="blog_item"><a href="/article/예스어스-블로그/8/352/">
            <img src="https://yes-us.co.kr/file_data/g9intable/gallery/2021/12/16/db8a445c64b55e0e022b5f2462368796.jpg" alt="돌돌 말아 구워낸 팽이버섯 가지롤 썸네일" />
            <strong>돌돌 말아 구워낸 팽이버섯 가지롤</strong>
          </a></div>
          <div className="blog_item"><a href="/article/예스어스-블로그/8/325/">
            <img src="https://yes-us.co.kr/file_data/g9intable/gallery/2021/12/08/c8ff7305d4b6a78b042e5f8220c0391c.jpg" alt="부드러운 식감이 좋은 가지밥 썸네일" />
            <strong>부드러운 식감이 좋은 가지밥</strong>
          </a></div>
        </div>
      </div> */}
      <div className="main_notice_list inner">
        <h3>공지사항</h3>
        <div className="inner">
          <a href="/notice/955/" className="notice_item">
            <span label="알림">알림</span> 2월 리뷰 이벤트 당첨자 발표</a>
          <a href="/notice/685/" className="notice_item">
            <span label="알림">알림</span> 1월 리뷰 이벤트 당첨자 발표</a>
        </div>
      </div>
    </div>
  );
}
