import React from 'react'
import { Collapse } from 'antd'
import { Link } from 'react-router-dom'
import { changePriceFormat } from '../../_actions/product_action'
import {CheckCircleOutlined} from '@ant-design/icons'

const { Panel } = Collapse


export default function OrderResult(props) {
  const order = {
    id: 222,
    date: '2022-01-05 12:12:17',
    name: '테스터일',
    status: '배송완료',
    price: {
      total: 27000,
      credit: 24500,
      product: 24000,
      discount: 2500,
      discount_detail: [
        {
          name: '회원할인',
          price: 2000
        }
      ],
      delivery: 3000,
      delivery_add: 0,
      mileage: 500,
      coupon: 0
    },
    shipping: {
      rname: '테스터일',
      postcode1: '427703',
      addr1: '경기도 과천시 막계동 서울랜드',
      addr2: '바이킹 3라인 가운데',
      rphone: '010-1234-4321',
      rtel: '',
      oemail: '',
      omessage: '부재 시 문 앞에 놓아주세요.',
    },
    item: [
      {
        id: 35,
        image_medium: '//yes-us.co.kr/web/product/medium/202203/20974d7e6e56a0f2b90b484a57e7139f.jpg',
        name: '[단품] 밀양 친환경 못난이 햇감자 5kg',
        quantity: 1,
        price: 27000,
        option: {
          name: '3kg',
          price: 0
        },
        discount: 0,
        delivery: {
          each: true,
          tracking_number: '555544442222',
          tracking: '',
          price: 3000
        },
        status: '배송완료',
      }
    ]
  }
  return (
    <>
      <div id="contents" className="orderform">
        <h2 className="titleArea">주문완료</h2>
        <div className="inner">
          <div className="result">
            <CheckCircleOutlined />
            <strong>고객님의 주문이 정상적으로 완료되었습니다.</strong>
              <div className="frm_row"><label className="frm_row-label">주문번호</label>
                {order.id}</div>
              <div className="frm_row"><label className="frm_row-label">결제금액</label>
                {changePriceFormat(order.price.credit)}원
              </div>
          </div>
          <Collapse defaultActiveKey={['1', '2', '3']} className="order-collapse order_info" expandIconPosition="end">
            <Panel header="결제수단" key="1" className="ordered_info">
              <div className="frm_row"><label className="frm_row-label">결제수단</label>
                신용카드 (김미란)<br />
                **** - **** - **** - 0001
              </div>
            </Panel>
            <Panel header="배송지" key="3">
              <div className="addressList">
                <strong>{order.shipping.name}</strong>
                <address>
                  {order.shipping.addr1}<br />
                  {order.shipping.addr2}
                </address>
                {order.shipping.rphone && <small>{order.shipping.rphone}</small>}
                {order.shipping.rtel && <small>{order.shipping.rtel}</small>}
                {order.shipping.omessage && <div className="deliveryMsg">
                  <label>배송 메세지</label>
                  {order.shipping.omessage}
                </div>}
              </div>
            </Panel>
            <Panel header="주문상품" key="2" className="cart">
              {order.item && order.item.map((item) => <div key={item.id}>
                <div className="prdBox">
                  <div className="detail">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image_medium} alt="" className="thumbnail" />
                      <strong>
                        {item.name}
                      </strong>
                    </Link>
                    <ul className="info">
                      {item.option && <li className="optionDesc">옵션: {item.option.name} </li>}
                      {item.quantity && <li>수량: {item.quantity}개</li>}
                      <li>배송 : {changePriceFormat(item.delivery.price)}원 {item.delivery.each && <small>[비례] / 개별배송</small>}</li>
                      <li className="price">상품 판매가: <strong>{changePriceFormat(item.price)}원</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="order_status">
                  <strong>{item.status}</strong>
                  {item.status === '배송완료' && <Link to="/review/write" className="btnNormal">구매후기</Link>}
                </div>
              </div>)}
              <Collapse className="price_ships" expandIconPosition="end">
                <Panel header={order.item && order.item.find((item) => item.delivery.each) ? `[개별배송]` : `[기본배송]`} key="1">
                  <p>
                    상품구매금액 <strong>{changePriceFormat(order.price.product)}</strong>
                    + 배송비 <strong>{changePriceFormat(order.price.delivery)}</strong>
                    - 상품할인금액 <strong>{changePriceFormat(order.price.discount)}</strong>
                    =
                  </p>
                  <p className="total">
                    합계 : <strong>{changePriceFormat(order.price.total)}</strong>원
                  </p>
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>
          <div className="order_payment">
            <Collapse defaultActiveKey={['1']} className="order-collapse" expandIconPosition="end">
              <Panel header="결제정보" key="1" className="totalSummary non_header">
                <Collapse expandIconPosition="end">
                  <Panel header="총 결제금액" extra={`${changePriceFormat(order.price.credit)}원`} showArrow={false} className="totalSummary" />
                  <Panel header="총 주문금액" extra={`${changePriceFormat(order.price.total)}원`} key="1" className="totalProduct">
                    <ul>
                      <li><label>상품금액</label> <span>{changePriceFormat(order.price.product)}원</span></li>
                      <li><label>배송비</label> <span>{changePriceFormat(order.price.delivery)}원</span></li>
                      <li><label>지역별 배송비</label> <span>{changePriceFormat(order.price.delivery_add)}원</span></li>
                    </ul>
                  </Panel>
                  <Panel header="총 할인/부가결제 금액" extra={`${changePriceFormat(order.price.discount)}원`} key="2" className="totalSale">
                    <ul>
                      <li><label>회원등급할인</label> <span>{changePriceFormat(order.price.discount)}원</span></li>
                      <li><label>쿠폰 사용</label> <span>{changePriceFormat(order.price.coupon)}원</span></li>
                      <li><label>적립금 사용</label> <span>{changePriceFormat(order.price.mileage)}원</span></li>
                    </ul>
                  </Panel>
                </Collapse>
              </Panel>
            </Collapse>
            <Link to="/order/list" className="btnNormal">주문목록보기</Link>
          </div>
        </div>
      </div>
    </>
  )
}
