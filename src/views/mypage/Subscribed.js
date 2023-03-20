import React, { useEffect, useState } from 'react';
import MyPageHeader from '../../components/MyPageHeader';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Api from '../../utils/customAPI';

import { Pagination } from 'swiper';

export default function Subscribed(props) {
  const user = useSelector((state) => state.user);
  const [history, setHistory] = useState(false);
  const getData = async (id) => {
    let body = {
      params: {
        mallCd: 'CAFE24',
        mallCustomerId: id,
      },
    };
    const request = await Api.get('/customer/getMypageData', body);
    setHistory(request.data.result.customerPickList.filter(order=> order.isSubscriptionYn === 'Y'))
  };
  useEffect(() => {
    if (!history) getData(user.username);
  }, []);
  return (
    <>
      {/* <MyPageHeader /> */}
      <div id="contents" className="myhome">
        <div className="inner myshop-wrapper">
          <div className="myshop-header">
            <h2>정기구독 관리</h2>
            <a href="/faq/" className="btnNormal">
              정기구독 FAQ
            </a>
          </div>
          <div className="myshop-inner">
            <div className="usersubscribe-usbox">
              <h3>
                {history && (
                  <span className="active">신청내역 ({history.length})</span>
                )}
                <span>해지내역 (0)</span>
              </h3>
              {history && history.length > 0 ? (
                <Swiper pagination={true} modules={[Pagination]}>
                  {history.map((order) => (
                    <SwiperSlide key={order.orderId} className="usersubscribe-usbox-detail usbox-detail"><Link to={`/myshop/subscribe/${order.opId}`}>
                      <img
                        src="//yes-us.co.kr/web/product/big/202111/c7dce572aad18b779ea5ff6f07cd272b.png"
                        className="thumbnail"
                        alt=""
                      />
                      <strong className="title">{order.productName}</strong>
                      <small className="info">
                        <label>옵션</label>
                        {order.optionName.replace('사이즈=','')}
                      </small>
                      <small className="info">
                        <label>주기</label> {order.subscriptionCycle}주에 한 번 / {order.subscriptionSequence}회
                      </small>
                      <span className="date">
                        다음결제일 <b>{moment(order.subscriptionNextOrderDate).format('YYYY-MM-DD',)}</b><br />
                        다음배송일 <b>{moment(order.subscriptionNextDeliveryPlanDate).format('YYYY-MM-DD')}</b>
                      </span>
                      <span className="btnNormal">자세히 보기</span>
                    </Link></SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="usersubscribe-usbox-detail blank usbox-detail">
                  신청 내역이 없습니다.
                </p>
              )}
            </div>
            <div className="usersubscribe-payment">
              <h3>결제카드 관리</h3>
              <div className="usersubscribe-payment-method ">
                <div className="cardinfo "></div>
                <div className="notify">
                  다음결제일 하루 전 위의 카드 정보로 다음 정기구독 결제가
                  진행됩니다.
                  <br />
                  결제 후&nbsp;차주 목요일 배송이 시작되며 실제 도착일은 택배사
                  사정에 따라 달라질 수 있습니다.
                </div>
              </div>
              <div className="userbtn-area displaynone ">
                <button className="btnNormal btn_submit">카드변경</button>
                <button className="btnNormal">카드삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
