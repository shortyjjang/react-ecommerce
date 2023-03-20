import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import BoardSort from '../../components/board/BoardSort';
import ProductItem from '../../components/product/ProductItem';
import { SearchOutlined } from '@ant-design/icons';
import Api from '../../utils/customAPI';
import { IMG_SERVER } from '../../utils/customAPI';
import AddCart from '../../components/product/AddCart';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ProductList(props) {
  const [products, setProducts] = useState(null);
  const category = [
    { name: 'all', no: 22 },
    { name: '채소', no: 50 },
    { name: '과일', no: 52 },
  ];
  const [sortCate, setSortCate] = useState(5);
  const [banner, setBanner] = useState([]);
  const [cartItem, setCartItem] = useState();
  const [showCart, setShowCart] = useState(false)
  const params = useParams();
  const getProduct = async (body) => {
    const request = await Api.get(
      '/api/v1/app/product/getProductInfo',
      body,
    ).then((response) => response.data.result);

    setProducts(request.filter((item) => item.productGubun !== '랜덤박스'));
  };
  const changeSort = (value) => {
    // getProduct({pageIndex: 1,sortType: value  })
    if (value === '4') {
      //높은가격순
      products.sort(function (a, b) {
        return b.salePrice - a.salePrice;
      });
    } else if (value === '3') {
      //낮은가격순
      products.sort(function (a, b) {
        return a.salePrice - b.salePrice;
      });
    } else if (value === '1') {
      //상품명

      products.sort(function (a, b) {
        const upperCaseA = a.productName.toUpperCase();
        const upperCaseB = b.productName.toUpperCase();

        if (upperCaseA > upperCaseB) return 1;
        if (upperCaseA < upperCaseB) return -1;
        if (upperCaseA === upperCaseB) return 0;
      });
    } else {
      //신상품
      getProduct({ pageIndex: 1, sortType: value });
    }
    setSortCate(value);
  };
  const getBanner = async () => {
    const body = {
      pbMode: 'ALL',
      pbSite: 'PS02',
      pbepPath:`https://yes-us.co.kr/products/${params.id}`
      //pbepPath: `https://yes-us.co.kr`,
    };
    const request = await Api.get(`/api/v1/pop_banner`,{params: body}).then(
      (res) => res.data.result
    );
    setBanner(request[0].popBannerPopupSlideList);
  };
  useEffect(() => {
    if (!products) getProduct({ pageIndex: 1, sortType: sortCate });
    if(!banner) getBanner();
  }, [params.id]);
  return (
    <div id="contents" className="category">
      <div className="inner">
        {banner && banner.length > 1 ? 
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
            modules={[Autoplay, Pagination, Navigation]}
            className="topbanner"
          >
            {banner.map(banner =>
              <SwiperSlide
                style={{
                  backgroundImage: `url(${IMG_SERVER}${banner.pbpsImagePath})`,
                }}
                key={banner.pbpsId}
              >
                <div
                  className="banner-text"
                  dangerouslySetInnerHTML={{ __html: banner.pbpsContents }}
                ></div>
                {banner.pbpsNewTabUsedYn === 'Y' ? (
                  <a
                    href={banner.pbbsLinkUrl}
                    className="vis_full_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="vis_link">{banner.pbbsTitle}</span>
                  </a>
                ) : (
                  <Link to={`${banner.pbbsLinkUrl}`} className="vis_full_link">
                    <span className="vis_link">{banner.pbbsTitle}</span>
                  </Link>
                )}
              </SwiperSlide>
            )}
          </Swiper>
          : banner.length > 0 && <div className="topbanner">
          {banner.map(banner =>
            <div
              style={{
                backgroundImage: `url(${IMG_SERVER}${banner.pbpsImagePath})`,
              }}
              key={banner.pbpsId}
              className="swiper-slide"
            >
              <div
                className="banner-text"
                dangerouslySetInnerHTML={{ __html: banner.pbpsContents }}
              ></div>
              {banner.pbpsNewTabUsedYn === 'Y' ? (
                <a
                  href={banner.pbbsLinkUrl}
                  className="vis_full_link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="vis_link">{banner.pbbsTitle}</span>
                </a>
              ) : (
                <Link to={`${banner.pbbsLinkUrl}`} className="vis_full_link">
                  <span className="vis_link">{banner.pbbsTitle}</span>
                </Link>
              )}
            </div>
          )}
          </div>
        }
        <ul className="menuCategory">
          {category.map(menu => 
              <li key={menu.no}>
                <Link to={`/products/${menu.no}`}
                  className={parseInt(params.id) === parseInt(menu.no) ? 'current' : ''}
                >
                  {menu.name}
                </Link>
              </li>
            )}
        </ul>
        <div className="searchbox">
          <input placeholder="검색어를 입력하세요" type="text" />
          <button type="submit" title="검색">
            <SearchOutlined />
          </button>
        </div>
        {products && <div className="pagesize">총 {products.length}개</div>}
        <BoardSort
          onChangeSort={changeSort}
          options={[
            { value: '5', name: '신상품' },
            { value: '1', name: '상품명' },
            { value: '3', name: '낮은가격' },
            { value: '4', name: '높은가격' },
          ]}
        />

        {products && products.length > 0 ? (
          <ul className="categoryList">
            {products.map(item => <li key={item.productId}><ProductItem item={item} setCartItem={setCartItem} setShowCart={setShowCart} /></li>)}
          </ul>
        ) : (
          <div className="empty"></div>
        )}
        {cartItem && <AddCart setShowCart={setShowCart} showCart={showCart} cartItem={cartItem}/>}
      </div>
    </div>
  );
}
