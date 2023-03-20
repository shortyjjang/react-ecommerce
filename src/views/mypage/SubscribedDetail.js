import React, { useEffect, useState } from 'react';
import MyPageHeader from '../../components/MyPageHeader';
import { Link, useParams } from 'react-router-dom';
import { DatePicker, Collapse, Select } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Api from '../../utils/customAPI';
import 'moment/locale/ko';

const { Panel } = Collapse;

export default function SubscribedDetail(props) {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderDate, setOrderDate] = useState();
  const [orderCycle, setOrderCycle] = useState();
  const getData = async (id) => {
    let body = {
      mallCd: 'cafe24',
      username: id,
      opId: params.id,
    };
    let body2 = {
      mallCd: 'cafe24',
      username: id,
    }
    const request = await Api.get('/customer/getMyRandomProductOrder',body);
    const request2 = await Api.get('/customer/getMypageData', body2);
    setOrderSummary(request2.data.result.customerPickList.find(order=> order.opId === params.id))
    setOrderDetail(request.data.result);
    setOrderDate(request2.data.result.customerPickList.find(order=> order.opId === params.id).subscriptionNextOrderDate);
    setOrderCycle(request2.data.result.customerPickList.find(order=> order.opId === params.id).subscriptionCycle)
  };
  useEffect(() => {
    if (!history) getData(user.username);
  }, [params]);
  return (
    <>
      {/* <MyPageHeader /> */}
      <div id="contents" className="myhome">
        {orderSummary && orderDetail && (
          <div className="inner myshop-wrapper">
            <div className="myshop-header">
              <h2>정기구독 신청내역</h2>
            </div>
            <div className="myshop-inner deliveryInfo_wrap">
              <div className="usersubscribe-usbox-detail usbox-detail"><Link to={`/usbox`}>
                <img
                  src="//yes-us.co.kr/web/product/big/202111/c7dce572aad18b779ea5ff6f07cd272b.png"
                  className="thumbnail"
                  alt=""
                />
                <strong className="title"><small>어스박스 정보</small>{orderSummary.productName}</strong>
                <small className="info">
                  <label>옵션:</label> {orderSummary.optionName.replace('사이즈=','')}
                </small>
                <small className="info">
                  <label>주기:</label> {orderSummary.subscriptionCycle}주에 한 번 / {orderSummary.subscriptionSequence}회
                </small>
              </Link></div>
              <div className="info_tabs usersubscribe-recieveinfo">
                <h3>수령 정보 [{orderSummary.subscriptionSequence}회차]</h3>
                <div className="date_info usersubscribe-recieveinfo-date">
                  <div className="next_pay">
                    <span>다음 결제일</span>
                    <strong>
                      {moment(orderDate).format('YYYY.MM.DD(dd)')}
                    </strong>
                  </div>
                  <div className="next_deli">
                    <span>다음 발송일</span>
                    <strong>
                      {moment(orderSummary.subscriptionNextDeliveryPlanDate).format('YYYY.MM.DD(dd)')}
                    </strong>
                  </div>
                </div>
                <div className="usersubscribe-recieveinfo-notify">
                  *랜덤박스는 매주 수요일 오전 9시까지 결제된 건에 대하여 매주
                  목요일 발송하고 있습니다
                </div>
                <div className="ant-collapse-header">
                  <span className="ant-collapse-header-text">{orderSummary.subscriptionSequence}회차 발송일 변경</span>
                  <div className="ant-collapse-extra">
                    <DatePicker
                      defaultValue={moment(orderDate, 'YYYY/MM/DD')}
                      onChange={(dateString) => setOrderDate(dateString)}
                    />
                  </div>
                </div>
                <div className="ant-collapse-header">
                  <span className="ant-collapse-header-text">배송주기 변경</span>
                  <div className="ant-collapse-extra">
                      <Select 
                        defaultValue={orderCycle}
                        onChange={(value) => setOrderCycle(value)}
                      >
                        <Select.Option value={1}>1주</Select.Option>
                        <Select.Option value={2}>2주</Select.Option>
                        <Select.Option value={3}>3주</Select.Option>
                      </Select>
                  </div>
                </div>
                <Collapse
                  expandIconPosition="end"
                  className="usersubscribe-recieveinfo-modify"
                >
                  <Panel
                    header="수령자 조회/변경"
                    className="user_info"
                    key="1"
                  >
                    <strong className="name_phone">테스터일</strong>
                    <strong className="name_phone dp_ib">
                      (010-1234-5678)
                    </strong>
                    <p className="addr">
                      경기도 과천시 막계동 서울랜드 바이킹 4라인
                    </p>
                    <p className="msg">부재 시 문 앞에 놓아주세요.</p>
                    <a
                      id="ec-shop-receiver_update_id"
                      href="#none"
                      className="btnNormal black "
                      title="새창 열림"
                    >
                      수령 정보 변경
                    </a>
                  </Panel>
                  <Panel header="유의사항" className="alert_div" key="2">
                    <ul>
                      <li className="fw9">
                        랜덤박스는 매주 수요일까지 결제된 건에 대하여 매주
                        목요일 발송됩니다
                      </li>
                      <li>
                        결제 금액은 주기 별 결제일 하루 전 메일 또는 SMS를 통해
                        안내되며, 위 판매가에서 결제 안내 시점의 할인 혜택 및
                        배송비 기준이 자동 적용되어 확정됩니다
                      </li>
                      <li>
                        배송주기 및 배송시작일 변경, 일부 상품 정기배송 해지
                        등으로 결제 예정된 주문의 구성이 달라질 경우 할인 혜택
                        및 배송비가 달라질 수 있습니다
                      </li>
                      <li>
                        결제가 완료된 후 수령 정보 변경 시 다음 결제 회차부터
                        반영됩니다
                      </li>
                    </ul>
                  </Panel>
                </Collapse>
              </div>
              <div className="userbtn-area ec-base-button justify">
                <button className="btnNormal btn_cancel ec-myshop-cancel-item">
                  정기구독 해지
                </button>
                <button className="btnNormal btn_submit">저장</button>
                <Link to="/myshop/subscribe" className="btnNormal">
                  목록
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
