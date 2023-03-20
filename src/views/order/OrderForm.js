import React, { useState, useEffect } from 'react'
import { Collapse, Checkbox, Radio, DatePicker, Modal } from 'antd';
import { CreditCardOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { changePriceFormat } from '../../_actions/product_action'
import Postal from '../../components/Postal';
import CartList from '../../components/order/CartList';
import DiscountList from '../../components/order/DiscountList';
import moment from 'moment';
import 'moment/locale/ko';
import DeliveryAddress from '../../components/order/DeliveryAddress';
import { useNavigate } from 'react-router-dom';
import Api from '../../utils/customAPI';

const { info } = Modal;
const { Panel } = Collapse;

export default function OrderForm(props) {
  const isLogin = useSelector(state => state.user.authenticated);
  const products = useSelector(state => state.shop.product)
  const order = useSelector(state => state.product.currentPrd);
  const navigate = useNavigate()
  const [isSubscribe, setSubscribe] = useState(false)
  const [showPostal, setShowPostal] = useState(false);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0)
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0)
  const [totalMileage, setTotalMileage] = useState(0);
  const [totalProductMileage, setTotalProductMileage] = useState(0)
  const [values, setValue] = useState({
    sameaddr: true,
    addr_paymethod: 'addr_paymethod0'
  })
  const [subscribeStartDate, setSubscribeStartDate] = useState(moment().format('d') < 3
    ? moment().add((4 - moment().format('d')), 'days').format('YYYY/MM/DD')
    : moment().add((11 - moment().format('d')), 'days').format('YYYY/MM/DD')
  )
  const totalPrice = () => {
    let total = 0, delivery = 0, totalDiscount = 0;
    order.map( async (item) => {
      const request = await Api.get('/api/v1/app/product/getProductIdForSale',{params: {productId:item.id}}).then(response => response.data.result)
      let discount = 0;
      console.log(request)
      total += (parseInt(request.options.length > 0 ? request.options.find(option => option.ponId === item.option).salePrice : request.productSalePrice)) * parseInt(item.quantity);
      if (request.discount) {
        request.discount.map(dis => discount += dis.price)
      }
      if (request.productShippingChargeType === '개별부과') {
        delivery += (parseInt(request.productShippingPrice) * parseInt(item.quantity))
      }else {
        delivery += parseInt(request.productShippingPrice)
      }
      if (request.mileage > 0) mileage => mileage += dis.mileage;
    });
    setTotalProductPrice(total);
    setTotalDeliveryPrice(delivery);
    if (user.authenticated) {
      setTotalDiscountPrice(totalDiscount + 2000)
    } else {
      setTotalDiscountPrice(totalDiscount)
    }
    setTotalProductMileage(mileage);
    setTotalMileage(mileage + 0 + 0) //상품마일리지+회원마일리지+쿠폰마일리지
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value
    })
  }
  const onCheck = (e) => {
    const { name, checked } = e.target;
    setValue({
      ...values,
      [name]: checked
    })
  }
  const setDiscountCode = () => {
    if (values.ec_discountcode) {
    }
  }
  const submitOrder = (e) => {
    e.preventDefault();
    // Api.post('', values)
    //   .then(res => navigate('/'))
  }
  useEffect(() => {
    if (order.length > 0) totalPrice()
  }, [isLogin])
  return (
    <div id="contents" className="orderform">
      
      {isSubscribe
        ? <h2 className="titleArea">정기 구독 신청서 작성</h2>
        : <h2 className="titleArea">주문서 작성</h2>
      }
      <div className="inner">
        <form onSubmit={submitOrder}>
          <Collapse defaultActiveKey={
            window.innerWidth > 720
              ? ['1', '3', '4']
              : ['1', '4']
          } className="order-collapse order_info" expandIconPosition="end">
            <Panel header="배송지" key="1">
              <DeliveryAddress values={values} onChange={onChange} setShowPostal={setShowPostal} setValue={setValue} onCheck={onCheck} />
            </Panel>
            {isSubscribe &&
              <Panel header="정기구독시작일" extra={subscribeStartDate} key="2" className="deliveryDate">
                <p>
                  <strong>첫 주문일</strong>
                  <span> [배송주기 : <b className="fcg">1주</b>]</span>
                </p>
                <DatePicker defaultValue={moment(subscribeStartDate, 'YYYY/MM/DD')} onChange={(dateString) => {
                  let deliveryDate = moment(dateString).format('d') < 4 ? moment(dateString).add(4 - moment(dateString).format('d'), 'days') : moment(dateString).add(11 - moment(dateString).format('d'), 'days')
                  info({
                    title: `${dateString} 선택 시`,
                    content: (
                      <div>
                        첫 결제일 :{moment(dateString).add(-1).format('YYYY/MM/DD(dd)')}<br />
                        첫 배송일: {moment(deliveryDate).format('YYYY/MM/DD(dd)')}<br />
                        다음 결제일 :{moment(dateString).add(6).format('YYYY/MM/DD(dd)')}<br />
                        다음 배송일: {moment(deliveryDate).add(7).format('YYYY/MM/DD(dd)')}
                      </div>
                    ),
                  });
                  setSubscribeStartDate(dateString)
                }} />
                <ul>
                  <li>어스박스는 <span className="fcg">매주 화요일</span>까지 결제건에 대하여 목요일에 발송됩니다</li>
                  <li><span className="fcg">수요일~일요일에 결제</span>된 경우 <span className="fcg">다음주 목요일</span>에 발송됩니다</li>
                  <li>다음회차 결제는 다음 선택요일에 진행되며, <span className="fcg">결제 D-1에 SMS등으로 사전 안내</span>됩니다</li>
                  <li>결제가 완료된 뒤 <span className="fcg">[마이페이지]에서 발송예정 품목리스트</span>를 확인하실 수 있습니다</li>
                  <li>품목리스트는 환경에 따라 <span className="fcg">일정 시간(최대 30분)이 소요</span>될 수 있습니다</li>
                </ul>
              </Panel>
            }
            <Panel header="주문상품" key="3" className="cart">
              {order && order.map(item =>
                <CartList item={item} key={item.id} />
              )}

              <Collapse className="price_ships" expandIconPosition="end">
                <Panel header={order && order.find((item) => products.find(product => product.product_no === item.id).delivery.each) ? `[개별배송]` : `[기본배송]`} key="1">
                  <p>
                    상품구매금액 <strong>{changePriceFormat(totalProductPrice)}</strong>
                    + 배송비 <strong>{changePriceFormat(totalDeliveryPrice)}</strong>
                    {/* - 상품할인금액 <strong></strong> */}
                    =
                  </p>
                  <p className="total">
                    합계 : <strong>{changePriceFormat(totalProductPrice + totalDeliveryPrice)}</strong>원
                  </p>
                </Panel>
              </Collapse>
            </Panel>
            <Panel header="할인/부가결제" key="4" className="discountDetail  mDiscountcodeSelect">
              <div className="frm_row">
                <label className="frm_row-label">할인코드 적용</label>
                <div className="flexbox">
                  <input type="text" name="ec_discountcode" onChange={onChange} value={values.ec_discountcode} className="full" />
                  {values.ec_discountcode ?
                    <button className="btnNormal mini" onClick={() => { setValue({ ...values, ec_discountcode: '' }); setDiscountCode(); }}>초기화</button>
                    : <button className="btnNormal mini" onClick={setDiscountCode}>적용</button>
                  }
                </div>
              </div>
              {totalDiscountPrice > 0 && <>
                {order && order.map((item, index) => <DiscountList item={item} key={index} />)}
                {isLogin === true && <ul><li><label>회원할인</label> <span>2,0000원</span></li></ul>}
              </>}
            </Panel>
          </Collapse>
          <div className="order_payment">
            <Collapse defaultActiveKey={['1', '2']} className="order-collapse" expandIconPosition="end">
              <Panel header="결제정보" key="1" className="payment_info">
                <ul>
                  <li>주문상품 <b>{changePriceFormat(totalProductPrice)}원</b></li>
                  <li>할인/부가결제 <b className="fcr">-{changePriceFormat(totalDiscountPrice)}원</b></li>
                  <li>배송비 <b>{changePriceFormat(totalDeliveryPrice)}원</b></li>
                  <li className="total">결제금액 <b>
                    {changePriceFormat(totalProductPrice + totalDeliveryPrice - totalDiscountPrice)}원
                  </b></li>
                </ul>
              </Panel>
              <Panel header="결제수단" key="2" className="payment_method">
                <Radio.Group onChange={onChange} value={values.addr_paymethod} name="addr_paymethod">
                  <Radio value={'addr_paymethod0'} title="신용카드"><CreditCardOutlined /></Radio>
                  {!isSubscribe && <Radio value={'addr_paymethod1'} title="토스"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.07 120" className="toss"><path d="M124.25 59.34a54.37 54.37 0 00-53.4-48.06h-.6a54.58 54.58 0 00-27.31 7.35l-.41.25-.36.21C11.09 37.6 0 80.34 0 106.36l25-14.45c8.82 16.81 25.75 27.88 44.62 28.09h.6a53.62 53.62 0 006.3-.37 54.37 54.37 0 0047.73-60.29zM399.63 86.56c3.67 7.29 10.23 11.08 18.91 11.06 8.52 0 13.08-4.15 13.06-9 0-5.93-8.84-7.28-19.36-9.38-13.85-2.88-29.24-7.1-29.24-24.45 0-13.85 13.33-25.91 33.58-25.81 16.08 0 26.17 5.56 33.64 15.09L432.73 54.2c-3.36-5.47-8.55-8.65-16.16-8.63-8.22 0-12.17 3.38-12.16 8 0 5.17 6.72 6.52 18.75 9.08 13.71 2.7 29.86 7.38 29.91 25 0 12.79-11.35 27.27-35.25 27.19-18 .05-29.93-6.17-36.83-17.44zM324.52 86.56c3.68 7.29 10.23 11.08 18.91 11.06 8.52 0 13.08-4.15 13.07-9 0-5.93-8.85-7.28-19.36-9.38-13.86-2.86-29.25-7.08-29.29-24.43 0-13.85 13.32-25.91 33.57-25.81 16.09 0 26.17 5.56 33.65 15.09L357.62 54.2c-3.36-5.47-8.55-8.65-16.16-8.63-8.22 0-12.17 3.38-12.15 8 0 5.17 6.71 6.52 18.75 9.08 13.7 2.7 29.85 7.38 29.9 25 0 12.79-11.34 27.27-35.25 27.19-18 .05-29.93-6.17-36.82-17.44zM258.26 29a42.92 42.92 0 1042.92 42.9A42.93 42.93 0 00258.26 29zm0 65.81a22.89 22.89 0 1122.89-22.91 22.89 22.89 0 01-22.89 22.89zM204.23 89.13c-2.64 2.11-8.17 4.71-10.94 4.71-5.38 0-9.07-3.07-9.07-11.83V49.4h25.55V30.66h-25.55V0l-21.29 12.29v18.37h-17V49.4h17v34.52c0 22.6 10.54 30.9 27.9 30.9 7.68 0 17.93-4.55 23.3-8.54z" fill="#0064ff"></path></svg> <a href="https://toss.im/"><QuestionCircleOutlined /></a></Radio>}
                </Radio.Group>
                {values.addr_paymethod === 'addr_paymethod0' ?
                  <ul className="tip"><li>소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</li></ul>
                  : <ul className="tip">
                    <li>토스는 간편하게 지문 또는 비밀번호만으로 결제할 수 있는 빠르고 편리한 간편 결제 서비스입니다.</li>
                    <li>토스 결제 후 취소/반품 등이 발생할 경우 토스를 통한 신용카드 취소/토스머니 환불이 이루어집니다.</li>
                    <li>토스 이용가능 결제수단 : 국내 발행 신용/체크카드, 토스머니</li>
                  </ul>
                }
              </Panel>
              {isLogin && <Panel header="적립 혜택" extra={(<span className="fcg">{changePriceFormat(totalMileage)}원 예정</span>)} key="3" className="payment_info">
                <ul>
                  <li>상품별 적립금 <b>{changePriceFormat(totalProductMileage)}원</b></li>
                  <li>회원 적립금 <b>0원</b></li>
                  <li>쿠폰 적립금 <b>0원</b></li>
                </ul>
              </Panel>}
            </Collapse>
            <div className="order_agreement">
              {values.simple_join_is_check ?
                <Checkbox className="allcheck" onChange={(e) => setValue({ ...values, mallAgree: e.target.checked, privacy_agreement_check_box: e.target.checked, information_agreement_check_box: e.target.checked })} checked={values.mallAgree && values.privacy_agreement_check_box && values.information_agreement_check_box} name="mallAgree"><strong>모든 약관 동의</strong></Checkbox>
                : <Checkbox className="allcheck" onChange={(e) => setValue({ ...values, mallAgree: e.target.checked, privacy_agreement_check_box: e.target.checked })} checked={values.mallAgree && values.privacy_agreement_check_box} name="mallAgree"><strong>모든 약관 동의</strong></Checkbox>}
              <Checkbox onChange={(e) => setValue({ ...values, mallAgree: e.target.checked })} checked={values.mallAgree} name="mallAgree"><b className="require">[필수]</b> 쇼핑몰 이용약관 동의</Checkbox>
              <Checkbox onChange={(e) => setValue({ ...values, privacy_agreement_check_box: e.target.checked })} checked={values.privacy_agreement_check_box} name="privacy_agreement_check_box"><b className="require">[필수]</b> 개인정보 수집 및 이용 동의</Checkbox>
              {values.simple_join_is_check && <Checkbox onChange={(e) => setValue({ ...values, information_agreement_check_box: e.target.checked })} checked={values.information_agreement_check_box} name="information_agreement_check_box">[선택] 개인정보 제3자 제공 동의</Checkbox>}
            </div>
            <button type="submit" className="btn_submit" onClick={() => navigate('/order/order_result/1')}>{changePriceFormat(totalProductPrice + totalDeliveryPrice)}원 결제하기</button>
            <ul className="tip">
              <li>무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다. 무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.</li>
              <li>최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.</li>
            </ul>
          </div>
        </form>
      </div>
      <Postal showPostal={showPostal} setShowPostal={setShowPostal} setAddress={(postal, addr1, addr2) => { setValue({ ...props.values, postcode1: postal, addr1: addr1, addr2: addr2 }); setShowPostal(false) }} />
    </div>
  )
}
