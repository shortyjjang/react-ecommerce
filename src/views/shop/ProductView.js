import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { changePriceFormat } from '../../_actions/product_action';
import ProductDetail from '../../components/product/ProductDetail';
import ProductFrm from '../../components/product/ProductFrm';
import { Swiper, SwiperSlide } from 'swiper/react';
import Api from '../../utils/customAPI';

export default function ProductView(props) {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [item, setItem] = useState([]);
  const [fixTab, setFixTab] = useState('');
  const [productName, setProductName] = useState();
  const [showOptionLayer, setShowOptionLayer] = useState(false)
  const [totalPrice, setTotalPrice] = useState({
    total: 0,
    quantity: 0,
    option: [],
  });

  const getProduct = async (productId) => {
    const request = await Api.get('/api/v1/app/product/getProductIdForSale', {
      params: { productId: productId },
    }).then((response) => response.data.result);
    setItem(request);
    if (request.optionUseYn === 'N') {
      setTotalPrice({
        ...totalPrice,
        total: request.productSalePrice,
        quantity: request.productCartLimitCount,
      });
    }
    setProductName(
      request.productName
        .replace('[친환경]', '')
        .replace('[못난이]', '')
        .replace('[유기농]', '')
        .replace('[단독판매]', ''),
    );
  };
  const getTotalPrice = (totalPrice) => {
    let totalqty = 0,
      totalprice = 0;
    if (totalPrice.option.length > 0) {
      totalPrice.option.map((selected) => {
        totalqty += selected.quantity;
        totalprice += selected.sales_price;
      });
      setTotalPrice({ ...totalPrice, quantity: totalqty, total: totalprice });
    }
  };

  const flowTab = useCallback(() => {
    // 스크롤시 버튼및 탭메뉴 고정
    if (
      document.getElementById('detail') &&
      document.getElementById('header')
    ) {
      if (
        window.pageYOffset >
          document.getElementById('detail').offsetTop -
            document.getElementById('header').clientHeight ||
        window.pageYOffset + window.innerHeight <
          document.querySelector('.product_btns').offsetTop +
            document.querySelector('.inner').offsetTop
      ) {
        setFixTab('fixed');
        if (
          window.pageYOffset >
          document.getElementById('root').clientHeight -
            document.getElementById('footer').clientHeight -
            window.innerHeight
        ) {
          setFixTab('fixed stop');
        } else {
          setFixTab('fixed');
        }
      } else {
        setFixTab('');
      }
    }
  }, []);

  useEffect(() => {
    //상품데이터
    getProduct(params.id);

    // 스크롤시 버튼및 탭메뉴 고정
    //window.addEventListener('scroll', flowTab);
  }, []);
  return (
    <div id="contents" className={`product ${fixTab}`}>
      {item && (
        <>
          <div className="inner">
            <div className="prdImgView">
              <Swiper>
                {item.productImageList &&
                  item.productImageList
                    .filter((img) => img.productImageType === '상세이미지')
                    .map((img) => (
                      <SwiperSlide key={img.productImagePath}>
                        <img
                          src={img.productImagePath}
                          alt={item.productName}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
              {item.productName &&
              item.productName.indexOf('[단독판매]') > -1 ? (
                <em className="icons">단독판매</em>
              ) : (
                ''
              )}
            </div>
            <div className="prdDesc">
              <h2 className="prdTitle">
                {item.productName && (
                  <span className="badge">
                    {item.productName.indexOf('[친환경]') > -1 ? (
                      <em className="eco">친환경</em>
                    ) : (
                      ''
                    )}
                    {item.productName.indexOf('[유기농]') > -1 ? (
                      <em className="organic">유기농</em>
                    ) : (
                      ''
                    )}
                    {item.productName.indexOf('[못난이]') > -1 ? (
                      <em className="ugly">못난이</em>
                    ) : (
                      ''
                    )}
                  </span>
                )}
                {productName}
              </h2>
              {item.productSummaryDesc && (
                <div className="summary">{item.productSummaryDesc}</div>
              )}
              {item.productNetPrice !== item.productSalePrice && (
                <div className="price">
                  <span className="txtDel">
                    {changePriceFormat(item.productNetPrice)}원
                  </span>
                </div>
              )}
              <div className="sale_price">
                {item.productDiscountRate !== 0 && (
                  <b className="fcg">{item.productDiscountRate}%</b>
                )}
                {changePriceFormat(item.productSalePrice)}원
              </div>
              <div className="info">
                <div className="delivery">
                  <label className="label">배송방법</label>
                  <small className="value">
                    {item.productShippingMethodType}
                  </small>
                </div>
                <div className="delivery_price">
                  <label className="label">배송비</label>
                  <span className="value">
                    {item.productShippingPrice === 0 ? (
                      <>무료배송</>
                    ) : item.productShippingChargeType === '개별부과' ? (
                      <>
                        {changePriceFormat(item.productShippingPrice)}원{' '}
                        <small>(1개 주문시)</small>
                      </>
                    ) : (
                      <>
                        {changePriceFormat(item.productShippingPrice)}원{' '}
                        <small>(주문시)</small>
                      </>
                    )}
                  </span>
                </div>
              </div>
              <ProductFrm
                item={item}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                getTotalPrice={getTotalPrice}
                showOptionLayer={showOptionLayer}
                setShowOptionLayer={setShowOptionLayer}
              />
              {/* <div id="NaverChk_Button"></div> */}
            </div>
          </div>
          <ProductDetail item={item} isLogin={user.authenticated} />
        </>
      )}
    </div>
  );
}
