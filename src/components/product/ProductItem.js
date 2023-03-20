
import React from 'react'
import { Link } from 'react-router-dom';
import { changePriceFormat } from '../../_actions/product_action';
export default function ProductItem(props) {
  return (
    <>
      <span className="img_wrap">
        <Link to={`/product/${props.item.productId}`}>
            <span className="thumbnail" style={{backgroundImage:`url('${props.item.listImageUrl ? props.item.listImageUrl: '//img.echosting.cafe24.com/thumb/198x198.gif'}')`}}></span>
            {props.item.productName.indexOf('[단독판매]') > -1 && <em className="icons">단독판매</em>}
        </Link>
        {props.item.saleStatus === '판매중' && <button className="btn_cart" onClick={() => {props.setShowCart(true);props.setCartItem(props.item)}}>장바구니담기</button>}
      </span>
      <Link to={`/product/${props.item.productId}`}>
        <b className="subject">{props.item.productName.replace('[친환경]','').replace('[못난이]','').replace('[유기농]','').replace('[단독판매]','')}</b>
        <span className="badge">
          {props.item.productName.indexOf('[친환경]') > -1 && <em className="eco">친환경</em>}
          {props.item.productName.indexOf('[유기농]') > -1 && <em className="organic">유기농</em>}
          {props.item.productName.indexOf('[못난이]') > -1 && <em className="ugly">못난이</em>}
        </span>
        <span className="price">
          <strong>
            {props.item.discountRate > 0 && <small className="fcg">{props.item.discountRate}%</small>}
            {changePriceFormat(props.item.salePrice)}원
          </strong>
          {props.item.netPrice !== props.item.salePrice && <>
            <em>{changePriceFormat(props.item.netPrice)}원</em>
          </>}
        </span>
      </Link>
    </>
  )
}
