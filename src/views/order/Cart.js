import React, { useEffect, useState, useCallback } from 'react';
import { Checkbox, Collapse, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { checkout, changePriceFormat } from '../../_actions/product_action'
import {Link} from 'react-router-dom'
import CartItem from '../../components/order/CartList';
import { useNavigate } from 'react-router-dom';
import DiscountList from '../../components/order/DiscountList';
import Api from '../../utils/customAPI';
import { addToCart } from '../../_actions/user_action';
import CartList from '../../components/order/CartList';
const { Panel } = Collapse;

export default function Cart(props) {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.user.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectCartItem, setSelectCartItem] = useState(null);
  const [isAllCheck, setIsAllCheck] = useState(false)
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0)

  const selectAllItem = () => {
    if (selectCartItem && selectCartItem.length === cart.length) {
      setSelectCartItem(null)
      setIsAllCheck(false)
    } else {
      setSelectCartItem(cart)
      setIsAllCheck(true)
    }
  }
  const getCheckout = (items) => {
    dispatch(checkout(items))
    if (user.authenticated === true) {
      navigate('/order/orderform')
    } else {
      navigate('/login')
    }
  }
  const deleteCartItem = (items) => {
    let newCartItems = []
    items.map(it => {
      console.log(it, cart.find(se => se.id === it.id))
      if(it.option && it.option.length === cart.find(se => se.id === it.id).option.length){
        newCartItems = cart.filter(se => se.id !== it.id)
      } else if(it.option){
        newCartItems = [
          ...cart.filter(se => se.id !== it.id),
          {
            ...cart.find (se => se.id === it.id),
            option : cart.find(se => se.id === it.id).option.filter(seOp => seOp.id !== it.option.id)
          }
        ]
      } else {
        newCartItems = cart.filter(se => se.id !== it.id)
      }
    })
    if(items === cart) newCartItems = [];
    if(user.authenticated) Api.post('',{username: user.username, cart: newCartItems})
    else window.localStorage.setItem('yesusCart', JSON.stringify(newCartItems))
    dispatch(addToCart(newCartItems))
  }
  const totalPrice = (list) => {
    let productPrice = 0, deliveryPrice = 0;
    list.map( async it => {
      const data = await Api.get('/api/v1/app/product/getProductIdForSale',{params :{productId:it.id}}).then(res => res.data.result)
      console.log(data)
      if(it.option) {it.option.map(opt => {
        productPrice += Number(opt.sales_price) * Number(opt.quantity)
      })}
      else{productPrice += Number(data.productSalePrice) * Number(it.quantity)}
      if(data.productShippingChargeType === '개별부과') {deliveryPrice += Number(data.productShippingPrice) * Number(it.quantity)
      }else{deliveryPrice += data.productShippingPrice}
      setTotalProductPrice(productPrice)
      setTotalDeliveryPrice(deliveryPrice)
    })
  }
  console.log(cart)
  useEffect(() => {
    if(selectCartItem && cart && cart.length === selectCartItem.length) {
      cart.map(item => {
        if(item.option && item.option.length !== selectCartItem.find(select => select.id === item.id).option.length) {
          setIsAllCheck(false)
        }else{
          setIsAllCheck(true)
        }
      })
    }else{
      setIsAllCheck(false)
    }
  }, [selectCartItem])
  return (
    <div id="contents" className="cart">
      <h2 className="titleArea">장바구니</h2>
      {cart && cart.length > 0 
      ? <div className='inner'>
        <Collapse defaultActiveKey={['1', '2']} expandIconPosition="end" className="order-collapse">
          <Panel header="장바구니 상품" key="1" className="list">
            <div className="control_all">
              <Checkbox onClick={selectAllItem} checked={isAllCheck} >전체선택</Checkbox>
              <button className="btnNormal mini" disabled={!selectCartItem} onClick={() => deleteCartItem(selectCartItem)}>선택삭제</button>
              <button className="btnNormal mini" onClick={() => deleteCartItem(cart)}>장바구니 비우기</button>
            </div>
            {cart && cart.map(item => <CartList  item={item} key={item.id} totalPrice={totalPrice} selectCartItem={selectCartItem} setSelectCartItem={setSelectCartItem} editOrder deleteCartItem={deleteCartItem} />
            )}
            <div className="price_ships">
                <p>
                  상품구매금액 <strong>{changePriceFormat(totalProductPrice)}</strong>
                  + 배송비 <strong>{changePriceFormat(totalDeliveryPrice)}</strong>
                  {totalDiscountPrice > 0 && <>- 상품할인금액 <strong className='fcr'>{changePriceFormat(totalDiscountPrice)}</strong></>}
                  =
                </p>
                <p className="total">
                  합계 : <strong>{changePriceFormat(totalProductPrice + totalDeliveryPrice - totalDiscountPrice)}</strong>원
                </p>
            </div>
          </Panel>
          <Panel header="총 결제금액" extra={`${changePriceFormat(totalProductPrice + totalDeliveryPrice - totalDiscountPrice)}원`} key="2" className="totalSummary">
            <Collapse expandIconPosition="end">
              <Panel header="총 상품금액" extra={`${changePriceFormat(totalProductPrice)}원`} showArrow={false} key="1" className="totalProduct">
                <ul>
                  <li><label>상품금액</label> <span>{changePriceFormat(totalProductPrice)}</span></li>
                  <li><label>부가세</label> <span></span></li>
                </ul>
              </Panel>
              <Panel header="총 배송비" extra={`${changePriceFormat(totalDeliveryPrice)}원`} key="2" showArrow={false} className="totalShipping" />
              {totalDiscountPrice > 0 && <Panel header="총 할인금액" extra={`${changePriceFormat(totalDiscountPrice)}원`} key="3" className="totalSale">
                {totalDiscountPrice > 0 && cart.map((item, index) => <DiscountList item={item} key={index} />)}
                {user.authenticated === true && <ul><li><label>회원할인</label> <span>2,0000원</span></li></ul>}
              </Panel>}
            </Collapse>
          </Panel>
        </Collapse>
        <div className={`cart_buttons`}>
          <button className="btnNormal" disabled={!selectCartItem} onClick={() => getCheckout(selectCartItem)}>선택상품주문</button>
          <button className="btnNormal btnSubmit" onClick={() => getCheckout(cart)}>전체상품주문</button>
        </div>
      </div>
      : <div className='inner empty'>
        <Empty description={false} />
        <p>장바구니에 담긴 상품이 없습니다.</p>
        <Link to="/" className="btnNormal">홈으로 가기</Link>
      </div>
      }
    </div>
  )
}