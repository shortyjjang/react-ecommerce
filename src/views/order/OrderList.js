import React, { useEffect, useState } from 'react'
import { Select, DatePicker, Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import MyPageHeader from '../../components/MyPageHeader';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {ExclamationCircleOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm  } = Modal;

export default function OrderList(props) {
  const isLogin = useSelector(state => state.user.authenticated)
  return (
    <>
      {isLogin && <MyPageHeader />}
      <div id="contents" className="orderlist">
        {isLogin
          ? <div className="inner myshop-wrapper">
            <div className="myshop-header">
              <h2>주문목록</h2>
            </div>
            <div className="myshop-inner">
              <Orders />
            </div>
          </div>
          : <Orders />
        }
      </div>
    </>
  )
}
function Orders(props) {
  const [showAll, setShowAll] = useState(true);
  const [ableDate, setAbleDate] = useState(false);
  const [orderStatus, setOrderStatus] = useState('all')
  const [orderDays, setOrderDays] = useState(90)
  const [orders, setOrders] = useState();
  const orderDaySet = (dateString) => {
    let start = moment(dateString[0]).format('YYYYMMDD')
    let end = moment(dateString[1]).format('YYYYMMDD')
    setOrders(orders.filter(order => moment(order.date).format('YYYYMMDD') > start && moment(order.date).format('YYYYMMDD') < end))
  }
  const orderLists = [
    {
      id: '20220106-0000131',
      date: '2022-04-28 12:12:17',
      name: '테스터일',
      status: 'shipped_complate',
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
          status: 'shipped_complate',
        }
      ]
    }, {
      id: '20220106-00001326',
      date: '2022-01-05 12:12:17',
      name: '테스터일',
      status: 'shipped_standby',
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
          price: 10000,
          option: {
            name: '5kg',
            price: 3000
          },
          discount: 0,
          delivery: {
            each: true,
            tracking_number: '555544442222',
            tracking: '',
            price: 3000
          },
          status: 'shipped_standby',
        },
        {
          id: 35,
          image_medium: '//yes-us.co.kr/web/product/medium/202203/20974d7e6e56a0f2b90b484a57e7139f.jpg',
          name: '[단품] 밀양 친환경 못난이 햇감자 5kg',
          quantity: 1,
          price: 10000,
          option: {
            name: '5kg',
            price: 3000
          },
          discount: 0,
          delivery: {
            each: true,
            tracking_number: '555544442222',
            tracking: '',
            price: 3000
          },
          status: 'shipped_begin',
        },
      ]
    }, {
      id: '20220106-0000139',
      date: '2022-01-05 12:12:17',
      name: '테스터일',
      status: 'order_cancel',
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
          quantity: 2,
          price: 7000,
          option: {
            name: '3kg',
            price: 0
          },
          discount: 0,
          delivery: {
            each: true,
            tracking_number: '',
            tracking: '',
            price: 3000
          },
          status: 'order_cancel',
        }
      ]
    }
  ]
  const cancelOrder = (orderId, index) => {
    confirm ({
      title: '정말 주문을 취소하시겠어요?',
      icon: <ExclamationCircleOutlined />,
      content: '어스박스 주문을 취소하시면 동일한 채소 품목으로 다시 구매가 불가능 할 수 있어요.',
      okText: '확인',
      cancelText: '취소',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const returnRequest = (orderId, index) => {
    const title = orderLists.find(order => order.id === orderId).item[index].name
    console.log(title)
    confirm ({
      title: <><b>{title}</b>의<br /> 교환/반품을 진행 하시겠어요?</>,
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '확인',
      cancelText: '취소',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  useEffect(() => {
    let order_list = orderLists;
    if (!showAll) order_list = order_list.filter(order => order.status === 'order_cancel' || order.status === 'order_exchange' || order.status === 'order_return')
    if (orderStatus !== 'all') order_list = order_list.filter(order => order.status === orderStatus)
    if (orderDays !== 'dateSat') {
      setAbleDate(false)
      order_list = order_list.filter(order => moment().diff(moment(order.date), 'days') < parseInt(orderDays))
    } else {
      setAbleDate(true)
    }
    setOrders(order_list)
  }, [showAll, orderStatus, orderDays])

  return (<>
    <div className="tab">
      <button className={showAll ? 'current' : ''} onClick={() => setShowAll(true)}>전체</button>
      <button className={!showAll ? 'current' : ''} onClick={() => setShowAll(false)}>취소/교환/반품</button>
    </div>
    <ul className="notification">
      <li><WarningOutlined /> 완료 후 36개월 이상 경과한 주문은 <Link to="/order/list/history">[과거주문내역]</Link>에서 확인할 수 있습니다.</li>
      <li><WarningOutlined /> 리뉴얼 전에 주문한 내역은 <Link to="/order/list/old">[이전 주문내역]</Link>에서 확인할 수 있습니다.</li>
      {showAll && <li><WarningOutlined /> 취소/교환/반품 신청은 주문 완료일 기준 5일까지 가능합니다.</li>}
    </ul>
    <div className="sort">
      <Select defaultValue={orderStatus} onChange={(value) => setOrderStatus(value)} className="order_status" value={orderStatus}>
        <Option value="all">전체 주문처리상태</Option>
        <Option value="shipped_before">입금전</Option>
        <Option value="shipped_standby">배송준비중</Option>
        <Option value="shipped_begin">배송중</Option>
        <Option value="shipped_complate">배송완료</Option>
        <Option value="order_cancel">취소</Option>
        <Option value="order_exchange">교환</Option>
        <Option value="order_return">반품</Option>
      </Select>
      <Select defaultValue={orderDays} onChange={(value) => setOrderDays(value)}>
        <Option value={0}>오늘</Option>
        <Option value={30}>1개월</Option>
        <Option value={90}>3개월</Option>
        <Option value={180}>6개월</Option>
        <Option value="dateSat">기간설정</Option>
      </Select>
      {ableDate && <RangePicker onChange={orderDaySet} />}
    </div>
    {orders && <div className="cart">
      {orders.map(order =>
        <div className="prdBox" key={order.id}>
          <Link to={`/order/detail/${order.id}`} className="order_number"><strong>{moment(order.date).format('YYYY-MM-DD')}</strong> ({order.id})</Link>
          {order.item && order.item.map((item, index) => <div key={index}>
            <Link to={`/order/detail/${order.id}`}>
              <span className="detail">
                <img src={item.image_medium} alt="" className="thumbnail" />
                <strong>{item.name}</strong>
                <span className="info">
                  수량: {item.quantity}개<br />
                  {item.option && <>옵션: {item.option.name}(+{item.option.price})<br /></>}
                  상품구매금액: {item.price}원
                </span>
              </span>
            </Link>
            <div className="order_status">
              {/* {item.status === 'shipped_before' && <strong>입금전</strong>} */}
              {item.status === 'shipped_standby' && <>
                <strong>배송준비중</strong>
                <button className="btnNormal">교환/반품</button>
                <button className="btnNormal" onClick={() => cancelOrder(order.id, index)}>주문취소</button>
              </>}
              {item.status === 'shipped_begin' && <strong>배송중</strong>}
              {item.status === 'order_cancel' && <strong>취소</strong>}
              {item.status === 'rder_exchange' && <strong>교환</strong>}
              {item.status === 'order_return' && <strong>반품</strong>}
              {item.status === 'shipped_complate' && <>
                <strong>배송완료</strong>
                <button className="btnNormal" onClick={() => returnRequest(order.id, index)}>교환/반품</button>
                <Link to="/review/write" className="btnNormal">구매후기</Link>
              </>}
            </div>
          </div>)}
        </div>
      )}
    </div>}
  </>)
}