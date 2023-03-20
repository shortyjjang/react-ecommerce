import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkout,
  changePriceFormat,
  addToWishlist,
} from '../../_actions/product_action';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Api from '../../utils/customAPI';
import InputNumber from '../InputNumber';
import { addToCart } from '../../_actions/user_action';

const { error, confirm } = Modal;

function CartItem(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const wishlist = useSelector((state) => state.product.wishlist);
  const [product, setProduct] = useState(null);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [isCheck, setIsCheck] = useState(false)
  const [option, setOption] = useState(props.item.option ?  props.item.option: null)
  const [qty, setQty] = useState(props.item.option ? props.item.option.quantity : props.item.quantity);
  const updateQuantity = async (value) => {
    setQty(value);
    let recentCart = user.cart.map(cart => {
      if(cart.id === props.item.id) {
        let newCart = {
          id: props.item.id,
          quantity:value
        }
        if(option) {
          let totalQty = Number(cart.quantity) - Number(cart.option.find(opt => opt.id === option.id).quantity)
          return{
            id: props.item.id,
            quantity:totalQty + value,
            option: cart.option.map(opt => {
            if(opt.id === option.id) {
              let newOpt = {
                id: opt.id,
                quantity: value,
                sales_price: product.options.find(opt => opt.ponId === option.id).salePrice
              }
              return newOpt;
            } else {return opt}})
          }
        }else{
          return newCart
        }
      } 
      else{return cart}
    })
    props.totalPrice(recentCart)
    if(user.authenticated) Api.post('',{username: user.username, cart: recentCart})
    else window.localStorage.setItem('yesusCart', JSON.stringify(recentCart))
    dispatch(addToCart(recentCart))
  };
  const checkItem = () => {
    let items = props.selectCartItem ? props.selectCartItem : []
    if (items.length > 0 && props.selectCartItem.find(item => item.id === props.item.id)) {
      //같은 아이템이 있을때
      const sameItem = props.selectCartItem.find(item => item.id === props.item.id);
      if(
        option &&
        sameItem.option.find(opt => opt.id === option.id) && 
        sameItem.option.length > 1
      ) {
        //같은 아이템에 또 다른 옵션이 있을때
        items = [
          ...props.selectCartItem.filter(item => item.id !== props.item.id),
          {
            id : props.item.id,
            quantity: Number(sameItem.quantity) - Number(qty),
            option: sameItem.option.filter(opt => opt.id !== option.id)
          }
        ]
      } else if(option && sameItem.option.filter(opt => opt.id !== option.id).length < 1) {
        //같은 아이템에 같은 옵션만 있을때
        items = props.selectCartItem.filter(item => item.id !== props.item.id);
      } else if(option) {
        //같은 아이템에 다른 옵션만 있을때
        items = [
          ...props.selectCartItem.filter(item => item.id !== props.item.id),
          {
            id : props.item.id,
            quantity: Number(sameItem.quantity) + Number(qty),
            option: [
              ...sameItem.option,
              {
                id: option.id,
                quantity: qty,
                sales_price: product.options.find(opt => opt.ponId === option.id).salePrice
              }
            ]
          }
        ]
        setIsCheck(true)
      } else {
        //옵션이 없는 같은 아이템만 있을때
        items = props.selectCartItem.filter(item => item.id !== props.item.id)
        setIsCheck(false)
      }
    } else if(option) {
      //같은 아이템이 없을때
      items = [
        ...items,
        {
          id: props.item.id,
          quantity: qty,
          option: [
            {
              id : option.id,
              quantity: qty,
              sales_price: product.options.find(opt => opt.ponId === option.id).salePrice
            }
          ]
        }
      ]
    }else {
      items = [
        ...items,
        {
          id: props.item.id,
          quantity: qty,
        }
      ]
    }
    props.setSelectCartItem(items.length > 0 ? items : null);
  }
  const addWishlist = () => {
    if (user.authenticated) {
      if (wishlist.find(item => item === product.productId)) {
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
        dispatch(addToWishlist(product.productId));
      }
    } else {
      confirm({
        title: '로그인 후 관심상품을 등록하 실 수 있습니다.',
        icon: <ExclamationCircleOutlined />,
        okText: '로그인 하기',
        cancelText: '취소',
        onOk() {
          navigate('/login');
        },
      });
    }
  };
  const deleteItem = () => {
    let item = [{
      id: props.item.id,
      option: [{
        id: option.id,
        quantity: qty,
        sales_price: product.options.find(opt => opt.ponId === option.id).salePrice
      }]
    }]
    props.deleteCartItem(item)
  }
  useEffect( async () => {
    if(!product ){
      const request = await Api.get('/api/v1/app/product/getProductIdForSale', {params :{productId: props.item.id }}).then(res => res.data.result)
      setProduct(request);
    }
    if(product) setTotalProductPrice(option
      ? Number(product.options.find(opt => opt.ponId === option.id).salePrice)
      : product.productSalePrice ? Number(product.productSalePrice) : 0
    )
    if(props.selectCartItem && props.selectCartItem.length > 0 && props.selectCartItem.find(item => item.id === props.item.id)) {
      if(option && !props.selectCartItem.find(item => item.id === props.item.id).option.find(opt => opt.id === option.id)) {
        setIsCheck(false)
      }else {
        setIsCheck(true)
      }
    }else{
      setIsCheck(false)
    }
  },[product, props.selectCartItem])
  return (
    <div className="prdBox">
      {props.editOrder && (
        <Checkbox
          name={props.item.id}
          onChange={checkItem}
          checked={isCheck}
        ></Checkbox>
      )}
      {product && <div className="detail">
        <Link to={`/product/${props.item.id}`}>
          {product.productImageList && <img
            src={product.productImageList.find(img => img.productImageType === '목록이미지').productImagePath}
            alt=""
            className="thumbnail"
          />}
          {product.productName}
          <span className="icons">
            {product.icons &&
              product.icons
                .filter((icon) => icon.useYn === 'Y')
                .map((icon) => <img src="" alt={icon.iconTypeDesc} />)}
          </span>
        </Link>
        <ul className="info">
          {option && product.options && (
            <li className="optionDesc">
              옵션:
              {product.options.find(opt => opt.ponId === option.id).optionName && product.options.find(opt => opt.ponId === option.id).optionName}
            </li>
          )} 
          {!props.editOrder && <li>수량: {props.item.quantity}개</li>}
          <li>
            배송 : {changePriceFormat(product.productShippingPrice)}원{' '}
            {product.productShippingChargeType === '개별부과' && (
              <small>[비례] / 개별배송</small>
            )}
          </li>
          <li className="price">
            <strong>{changePriceFormat(totalProductPrice)}원</strong>
          </li>
          {totalDiscountPrice > 0 && (
            <li className="price">
              할인금액:{' '}
              <span className="fcr">
                -{changePriceFormat(totalDiscountPrice)}원
              </span>
            </li>
          )}
        </ul>
        {props.editOrder && <InputNumber number={qty} min={product.productCartLimitCount ? product.productCartLimitCount : 1} updateNum={updateQuantity} />}
      </div>}
      {product && <div className="total_price">
        합계 :
        {product.productShippingChargeType === '개별부과' ? (
          <strong id="sum_price_front0">
            {changePriceFormat(
              (parseInt(totalProductPrice) +
                parseInt(product.productShippingPrice) -
                parseInt(totalDiscountPrice)) *
                parseInt(qty),
            )}
          </strong>
        ) : (
          <strong id="sum_price_front0">
            {changePriceFormat(
              parseInt(totalProductPrice) *
                parseInt(qty) +
                parseInt(product.productShippingPrice) -
                parseInt(totalDiscountPrice),
            )}
          </strong>
        )}
        원
      </div>}
      {props.editOrder && (
        <div className="buttons">
          <button
            className="btnNormal mini"
            onClick={deleteItem}
          >
            삭제
          </button>
          <button className="btnNormal mini" onClick={addWishlist}>
            관심상품
          </button>
          <button
            className="btnNormal mini btn_order"
            onClick={() => {
              let value = [
                {
                  id: props.item.id,
                  quantity: props.item.quantity,
                  // option: option,
                },
              ];
              dispatch(checkout(value));
            }}
          >
            주문하기
          </button>
        </div>
      )}
    </div>
  )
}

export default function CartList(props) {
  return (
    <>
    {props.item && props.item.option
      ? props.item.option.map(opt => <CartItem item={{...props.item, option:opt}} key={opt.id} deleteCartItem={props.deleteCartItem} totalPrice={props.totalPrice} selectCartItem={props.selectCartItem} setSelectCartItem={props.setSelectCartItem} editOrder />)
      : <CartItem item={props.item} deleteCartItem={props.deleteCartItem} key={props.item.id} totalPrice={props.totalPrice} selectCartItem={props.selectCartItem} setSelectCartItem={props.setSelectCartItem} editOrder />
    }
    </>
  );
}
