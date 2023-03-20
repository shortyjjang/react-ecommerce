import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { addToWishlist, checkout } from '../../_actions/product_action'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Api from "../../utils/customAPI";
import { addToCart } from '../../_actions/user_action'

const { confirm, error } = Modal

export default function ProductBtns(props) {
  const user = useSelector(state => state.user)
  const wishlist = useSelector(state => state.product.wishlist)
  const cart = user.cart;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const addCart = (id,quantity,option) => {
    let item = {
      id: id,
      quantity: Number(quantity)
    }
    let recentCart = cart ? cart.filter(cart => cart.id !== id) : []
    if(cart && cart.find(cart => cart.id === id)) {
      item = {
        ...item,
        quantity: Number(cart.find(cart => cart.id === id).quantity) + Number(quantity)
      }
      if(option && option.map(option => cart.find(cart => cart.id === id).option.find(opt => opt.id === option.id))) {
          let recentOption = cart.find(cart => cart.id === id).option;
          item = {
            ...item,
            option: [
              ...option.map(option => recentOption.filter(opt => opt.id !== option.id)),
              {
                id: option.id,
                quantity: Number(cart.find(cart => cart.id === id).option.find(opt => opt.id === option.id).quantity) + Number(option.quantity),
                sales_price: Number(cart.find(cart => cart.id === id).option.find(opt => opt.id === option.id).sales_price) + Number(option.sales_price)
              }
            ]
          }
      } else{
        item = {
          id: id,
          quantity: Number(cart.find(cart => cart.id === id).quantity) + Number(quantity),
          option: [
            ...cart.find(cart => cart.id === id).option,
            ...option
          ]
        }
      }
    } else if(option) {
      item = {
        ...item,
        option:option
      }
    }
    props.setTotalPrice({
      total: 0,
      quantity: 0,
      option: [],
    });
    recentCart = [
      ...recentCart,
      item
    ]
    if(user.authenticated) Api.post('',{username: username, cart: recentCart})
    else window.localStorage.setItem('yesusCart', JSON.stringify(recentCart))
    dispatch(addToCart(recentCart))
  }
  const duplicateItem = (option) => {
    confirm({
      title: '이미 카트안에 같은 상품이 담겨있습니다. 계속 진행 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '장바구니담기',
      cancelText: '취소',
      onOk() {addCart(option)},
    });
  }
  const goCart = () => {
    if(!props.showOptionLayer) {
      props.setShowOptionLayer(true)
    }else{
      props.setShowOptionLayer(false)
      if (props.totalPrice.total === 0) {
        error({
          title: '선택한 상품이 없습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '확인',
        });
        return
      }
      if(!user.authenticated && props.item.group) {
        confirm({
          title: '로그인 후 구매할 수 있습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '로그인 하기',
          cancelText: '취소',
          onOk() { navigate('/login') },
        });
      }else{
        if(props.totalPrice.option){
          let inCart = false
          props.totalPrice.option.map(option =>{
            if(cart && cart.find(item => item.id === props.item.productId && item.option === option.id )) inCart = true
          })
          // console.log(props.item.productId, props.totalPrice.quantity, props.totalPrice.option)
          if(inCart) {
            duplicateItem(props.item.productId, props.totalPrice.quantity, props.totalPrice.option)
          }else{
            addCart(props.item.productId, props.totalPrice.quantity, props.totalPrice.option)
          }
        } else if(cart && cart.length > 0 && cart.find(item => item.id === props.item.productId)) {
          duplicateItem(props.item.productId, props.totalPrice.quantity)
        }else{
          addCart(props.item.productId, props.totalPrice.quantity)
        }
      }
    }
  } 
  const getCheckout = () => {
    if(!props.showOptionLayer) {
      props.setShowOptionLayer(true)
    }else{
      props.setShowOptionLayer(false)
      let item = {
        id: props.item.productId,
        quantity: props.totalPrice.quantity
      }
      if (props.totalPrice.total === 0) {
        error({
          title: '선택한 상품이 없습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '확인',
        });
        return
      }
      if(!user.authenticated && props.item.group) {
        confirm({
          title: '로그인 후 구매할 수 있습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '로그인 하기',
          cancelText: '취소',
          onOk() { navigate('/login') },
        });
      }else{
        const goCheckout = () => {
          if (user.authenticated) {
            navigate('/order/orderform')
          } else if (!props.item.group) {
            navigate('/login')
          }
        }
        if(props.totalPrice.option && props.totalPrice.option.length > 0){
          const onlyThisItems = () => {
            let items = []
            props.totalPrice.option.map(option =>{
              item = {...item, option: option.id,}
              if(option.cycle) item = {...item,cycle: option.cycle }
              items = [...items, item]
            })
            dispatch(checkout(items));
          }
          if(props.totalPrice.option.find(option => cart.find(item => item.id === props.item.productId && item.option === option.id))) {
            confirm({
              title: '이미 카트안에 같은 상품이 담겨있습니다. 같이 결제 하시겠습니까?',
              icon: <ExclamationCircleOutlined />,
              okText: '같이 결제하기',
              cancelText: '이 상품만 결제하기',
              onOk() {
                let items = []
                props.totalPrice.option.map(option =>{
                  item = {...item, option: option.id, quantity: parseInt(props.totalPrice.quantity) + parseInt(cart.find(item => item.id === props.item.productId).quantity) }
                  if(option.cycle) item = {...item,cycle: option.cycle }
                  items = [...items, item]
                })
                dispatch(checkout(items));goCheckout()
              },
              onCancel() {onlyThisItems();goCheckout()}
            });
          }else{
            onlyThisItems();goCheckout()
          }
        } else {
          if(cart.find(item => item.id === props.item.productId)) {
            confirm({
              title: '이미 카트안에 같은 상품이 담겨있습니다. 같이 결제 하시겠습니까?',
              icon: <ExclamationCircleOutlined />,
              okText: '같이 결제하기',
              cancelText: '이 상품만 결제하기',
              onOk() {dispatch(checkout([{...item, quantity: parseInt(cart.find(item => item.id === props.item.productId).quantity) + parseInt(props.totalPrice.quantity)}]));goCheckout()},
              onCancel() {dispatch(checkout([item]));goCheckout()}
            });
          }else{
            dispatch(checkout([item]));goCheckout()
          }
        }
      }
    }
    
    // dispatch(checkout({id:props.item.productId, ...props.totalPrice}))
  }
  const addWishlist = () => {
    if (user.authenticated) {
      if (wishlist.find(item => item === props.item.productId)) {
        error({
          title: '이미 관심상품에 등록되어있습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '확인',
        });
      } else {
        error({
          title: '관심상품에 등록되었습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '확인',
        });
        dispatch(addToWishlist(props.item.productId))
      }
    }
    else {
      confirm({
        title: '로그인 후 관심상품을 등록하 실 수 있습니다.',
        icon: <ExclamationCircleOutlined />,
        okText: '로그인 하기',
        cancelText: '취소',
        onOk() { navigate('/login') },
      });
    }
  }

  return (
    <div className={props.className}>
      {props.item.productSaleStatus === '판매중' && <button className="btnNormal submit" disabled={props.item.soldout} onClick={getCheckout}>구매하기</button>}
      {props.item.productSaleStatus === '판매중' ?
        <button type="button" className="btnNormal" disabled={props.item.soldout} onClick={goCart}>장바구니</button>
        :
        <button type="button" className="btnNormal" disabled>SOLD OUT</button>
      }
      {/* <button type="button" className="btnNormal" onClick={addWishlist}>관심상품</button> */}
    </div>
  )
}
