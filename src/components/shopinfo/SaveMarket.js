import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Api from '../../utils/customAPI';

export default function SaveMarket(props) {
  const [showMonth, setShowMonth] = useState(moment().format('YYYYMM01'));
  const [prevMonth, setprevMonth] = useState(true);
  const [nextMonth, setnextMonth] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [save, setSave] = useState({
    money: 0,
    percentage: 0,
  });
  const pastOrder = async (month) => {
    setShowMonth(month);
    let body = {
      params: {
        mallCd: 'cafe24',
        username: props.username,
        targetMonthStartDate: moment(month).format('YYYY-MM-DD'),
      },
    };
    const res = await Api.get(
      '/api/v1/customer/getRandomProductOrderHistoryWithTerm',
      body,
    );

    if (
      month > 20211101 &&
      moment.duration(moment().diff(moment(month))).asYears() < 1
    ) {
      setprevMonth(true);
    } else {
      setprevMonth(false);
    }
    if (month < moment().format('YYYYMM01')) {
      setnextMonth(true);
    } else {
      setnextMonth(false);
    }

    let pay_p = 0,
      eco_p = 0;
    if (res.data.result.length > 0) {
      for (let item of res.data.result) {
        pay_p += item.productPrice;
        eco_p += item.ecoPrice;
      }
      setOrderList(res.data.result);
      setSave({
        money: eco_p - pay_p,
        percentage: parseInt((pay_p / eco_p) * 100),
      });
    } else {
      setOrderList('');
      setSave({
        money: 0,
        percentage: 0,
      });
    }
  };
  const changeMoney = (money) => {
    return new Intl.NumberFormat().format(parseInt(money));
  };
  useEffect(() => {
    pastOrder(showMonth);
  }, []);
  return (
    <>
      <div className="card_box">
        <div className="saveBox">
          <span className="this_month">
            {moment(showMonth).format('YY년 MM월')}
          </span>{' '}
          <span>절약금액</span>
          <br />
          <strong className="pay_p">{changeMoney(save.money)}원</strong>
          <strong className="fcg eco_p">({save.percentage}%)</strong>
          {prevMonth && (
            <button
              className="swiper-button-prev"
              onClick={() =>
                pastOrder(
                  moment(showMonth).add(-1, 'months').format('YYYYMM01'),
                )
              }
            >
              {moment(showMonth).add(-1, 'months').format('YYYYMM01')}
            </button>
          )}
          {nextMonth && (
            <button
              className="swiper-button-next"
              onClick={() =>
                pastOrder(
                  moment(showMonth)
                    .add(+1, 'months')
                    .format('YYYYMM01'),
                )
              }
            >
              {moment(showMonth).add(-1, 'months').format('YYYYMM01')}
            </button>
          )}
        </div>
        <p className="fs14">
          *최근 1년 간 어스박스 주문내역을 확인할 수 있습니다.
        </p>
        <div className="order_list">
          {orderList ? (
            orderList.map((item, index) => (
              <div className="item_wrap" key={index}>
                <div
                  className={
                    item.deliveryStatus !== '배송중'
                      ? 'order_item'
                      : 'order_item delivering'
                  }
                >
                  <div className="img">
                    <img
                      src="//yes-us.co.kr/web/product/big/202111/c7dce572aad18b779ea5ff6f07cd272b.png"
                      alt="썸네일"
                    />
                  </div>
                  <dl className="text">
                    <dt>
                      <strong>
                        {moment(item.sendDate).format('M/D(dd)')} 발송
                      </strong>
                      {item.deliveryStatus !== '배송중' ? (
                        <span>배송완료</span>
                      ) : (
                        <span>배송중</span>
                      )}
                    </dt>
                    <dd>{item.productItemNames.replace(/,/g, ', ')}</dd>
                  </dl>
                </div>
                <div className="save_item">
                  <table className="save_table">
                    <tbody>
                      <tr>
                        <td>
                          {moment(item.invoiceRegDate).format('MM월')}{' '}
                          {moment(item.invoiceRegDate).week() -
                            moment(moment(item.invoiceRegDate))
                              .startOf('month')
                              .week() +
                            1}
                          주 채소의 시세
                        </td>
                        <td className="ta_r">{changeMoney(item.ecoPrice)}원</td>
                      </tr>
                      <tr>
                        <td>어스박스 결제금액</td>
                        <td className="ta_r">
                          {changeMoney(item.productPrice)}원
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="fw9">
                        <td>절약금액</td>
                        <td className="ta_r">
                          {changeMoney(item.savePrice)}원{' '}
                          <span className="fcg">({item.savePercent}%)</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="gr_back ta_c">
              <strong className="fs20">이번달 주문내역이 없습니다.</strong>
              <Link to="/product/22" className="sqr_btn">
                어스박스 구매하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
