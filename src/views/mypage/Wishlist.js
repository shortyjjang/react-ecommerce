import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyPageHeader from '../../components/MyPageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { changePriceFormat, removeWishlist,  checkout } from '../../_actions/product_action';
import { Modal, Radio } from 'antd'

function WishlistItem(props) {
  const products = useSelector(state => state.shop.product)
  const product = products.find(item => item.product_no === props.itemId)
  const [showModal, setShowModal] = useState(false)
  const [optionType, setOptionType] = useState()
  const [deliveryCycle, setDeliveryCycle] = useState(1)
  const [totalPrice, setTotalPrice] = useState({
    total: 0,
    salePrice: 0,
    quantity: 1
  })
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const getTotalPrice = (totalPrice) => {
    const addedPrice = product.option ? product.option.find(option => option.id === totalPrice.option).price : 0
    const productPrice = parseInt(product.sales_price) + parseInt(addedPrice)
    const qty = parseInt(totalPrice.quantity)
    setTotalPrice({ ...totalPrice, total: productPrice * qty })
  }
  const goCart = () => {
    if (product.option && !totalPrice.option) {
      setShowModal(true);
      return
    }
    // dispatch(addToCart(product.product_no, totalPrice.quantity, totalPrice.option, totalPrice.cycle))
    navigate('/order/basket')
  }
  const getCheckout = () => {
    if (product.option && !totalPrice.option) {
      setShowModal(true);
      return
    }
    let items = {
      id: product.product_no,
      quantity: totalPrice.quantity,
      option: totalPrice.option
    }
    if (totalPrice.cycle) items = {
      id: product.product_no,
      quantity: totalPrice.quantity,
      option: totalPrice.option,
      cycle: totalPrice.cycle
    }
    goCart()
    dispatch(checkout([items]))
    navigate('/order/orderform')
  }
  const updateOption = (e) => {
    if (product.group && optionType === '정기구독') {
      setTotalPrice({ ...totalPrice, cycle: deliveryCycle, option: e.target.value })
    } else {
      setTotalPrice({ ...totalPrice, option: e.target.value })
    }
    getTotalPrice({ ...totalPrice, option: e.target.value })
    setShowModal(false);
  }
  useEffect(() => {
    if (product) {
      if (product.group) setOptionType('정기구독')
      setTotalPrice({
        ...totalPrice,
        total: product.sales_price,
        salePrice: product.sales_price,
      })
    }
  }, [product])
  return (
    <>
      {product && <div className="prdBox">
        <Link to={`/product/${product.product_no}`}>
          <span className="detail">
            <img src={product.image_medium} alt="" className="thumbnail" />
            <strong>
              {product.name}
              {product.soldout && <span className="itemLabel bwfk">품절</span>}
              {product.stock && <span className="itemLabel bwfk">한정</span>}
              {product.new && <span className="itemLabel byfk">NEW</span>}
              {product.secret && <span className="itemLabel byfk">시크릿굿즈</span>}
              {product.recommend && <span className="itemLabel bgfw">예약</span>}
            </strong>
            <span className="info">
              판매가: {changePriceFormat(product.sales_price)}원<br />
              배송비:
              {product.delivery.price === 0
                ? <>무료배송</>
                : product.delivery.each
                  ? <>{changePriceFormat(product.delivery.price)}원 (개별배송) </>
                  : <>{changePriceFormat(product.delivery.price)}원 (기본배송) </>
              }
            </span>
          </span>
        </Link>
        <div className="order_status">
          <button className="btnNormal" onClick={getCheckout}>주문하기</button>
          <button className="btnNormal" onClick={goCart}>장바구니담기</button>
          <button className="btnNormal" onClick={() => dispatch(removeWishlist(product.product_no))}>삭제</button>
        </div>
      </div>}
      {product && !product.soldout && <Modal
        visible={showModal}
        title="옵션 선택"
        onOk={() => setShowModal(false)}
        onCancel={() => { setTotalPrice({ ...totalPrice, option: '' }); setShowModal(false) }}
        okText='확인'
        cancelText='취소'
        className="optionModal"
      >
        {product.group
          ? <>
            <div className="option">
              <label className="label">구매방법</label>
              <span className="value">
                <Radio.Group value={optionType} onChange={(e) => setOptionType(e.target.value)}>
                  {product.option_type.type.map((option) => <Radio value={option} key={option}>{option}</Radio>)}
                </Radio.Group>
              </span>
            </div>
            {optionType === '정기구독' &&
              <div className="option">
                <label className="label">배송주기</label>
                <span className="value">
                  <Radio.Group value={deliveryCycle} className="btn" onChange={(e) => setDeliveryCycle(e.target.value)}>
                    {product.option_type.cycle.map((option) => <Radio value={option} key={option}><strong>{option}주 마다</strong></Radio>)}
                  </Radio.Group>
                </span>
              </div>}
          </>
          :
          <>
            {product.option_type.size && product.option_type.size.length > 1 && <div className="option">
              <label className="label">사이즈</label>
              <span className="value">
                <Radio.Group className="btn" value={optionType} onChange={(e) => setOptionType(e.target.value)}>
                  {product.option_type.size.map((option) => <Radio value={option} key={option}>{option}</Radio>)}
                </Radio.Group>
              </span>
            </div>}
          </>
        }
        <div className="option">
          <label className="label">용량</label>
          <span className="value">
            <Radio.Group className="btn" value={totalPrice.option} onChange={updateOption}>
              {product.option_type.size && product.option_type.size.length > 1
                ? optionType
                  ? <>{product.option.filter(option => option.size === optionType).map(option => <Radio value={option.id} key={option.id}>{option.weight}</Radio>)}</>
                  : <>{product.option_type.weight.map(option => <Radio value={option} key={option} disabled>{option}</Radio>)}</>
                : <>{product.option.map(option => <Radio value={option.id} key={option.id}>{option.weight}</Radio>)}</>}
            </Radio.Group>
          </span>
        </div>

      </Modal>}
    </>

  )
}

export default function Wishlist(props) {
  const wishlist = useSelector(state => state.product.wishlist)
  return (
    <>
      <MyPageHeader />
      <div id="contents" className="orderlist myhome">
        <div className="inner myshop-wrapper">
          <div className="myshop-header">
            <h2>나의 관심상품</h2>
          </div>
          <div className="myshop-inner cart">
            <h3>상품목록</h3>
            {wishlist.length > 0
              ? wishlist.map(item => <WishlistItem itemId={item} key={item} />)
              : <div className="empty">등록된 관심상품이 없습니다.</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
