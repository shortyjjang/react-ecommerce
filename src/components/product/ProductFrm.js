import React, { useEffect, useState } from 'react'
import { Radio } from 'antd'
import { changePriceFormat } from '../../_actions/product_action'
import SelectedOptionItem from './SelectedOptionItem'
import ProductBtns from './ProductBtns';
import InputNumber from '../InputNumber';

export default function ProductFrm(props) {
  const [optionType, setOptionType] = useState()
  const [optionName, setOptionName] = useState()
  const [deliveryCycle, setDeliveryCycle] = useState(1)
  const [optionQty, setOptionQty] = useState(1)
  const [isSubscribe, setSubscribe] = useState(false)
  const [showOption, setShowOption] = useState(false)
  const [showSizeOption, setShowSizeOption] = useState(false)
  const updateQty = (qty) => {
    qty = parseInt(qty)
    setOptionQty(qty)
    props.setTotalPrice({
      quantity: qty,
      total: parseInt(props.item.productSalePrice) * qty
    })
  }
  const updateOption = (e) => {
    setShowOption(!showOption)
    setOptionName(e.target.value)
    if(props.totalPrice.option === [] || !props.totalPrice.option.find(added => added.id === e.target.value)){
      let qty = optionQty, optionPrice = parseInt(props.item.options.find(option => option.ponId === e.target.value).salePrice);
      if(!optionQty) qty = props.item.productCartLimitCount? props.item.productCartLimitCount:1;
      optionPrice =  parseInt(props.item.options.find(option => option.ponId === e.target.value).salePrice) * parseInt(qty)
      let newOption = {
        id: e.target.value,
        quantity: parseInt(qty),
        sales_price: optionPrice
      },total_price = 0, total_qty = 0
      props.totalPrice.option.filter(added => added.id !== e.target.value).map(option => total_price += parseInt(option.sales_price))
      props.totalPrice.option.filter(added => added.id !== e.target.value).map(option => total_qty += parseInt(option.quantity))


      props.setTotalPrice({ ...props.totalPrice, 
        quantity: total_qty + qty,
        total: total_price + optionPrice,
        option: [
        ...props.totalPrice.option,
        newOption
      ]})
      setOptionQty(qty)
    }else{
      alert('아래 리스트에서 이미 선택된 옵션을 삭제 후 다시 선택해 주세요')
    }
  }
  useEffect(() => {
    if (props.item.productGubun === '정기구독' || props.item.productGubun === '랜덤박스' || props.item.productGubun === '랜덤박스 사은품') {
      setSubscribe(true)
      setOptionType('정기구독')
    }
    if(props.item) setOptionQty(props.item.productCartLimitCount ? props.item.productCartLimitCount : 1)
  }, [props.item])
  return (
    <>
      {props.item && props.item.productSaleStatus === '판매중' && props.showOptionLayer && <div className='option_layer'>
        {props.item.optionUseYn === 'Y' ?
          <>
            {isSubscribe && <>
              <div className="option type">
                <Radio.Group value={optionType} onChange={(e) => setOptionType(e.target.value)}>
                  <Radio value="1회구매">1회구매</Radio>
                  <Radio value="정기구독">정기구독</Radio>
                </Radio.Group>
                <div className="subscribe_benefit">
                  <strong>정기구독 시 더해지는 할인혜택!</strong>
                  <ul>
                    <li>1회차부터 <em className="fcg">500원 즉시 할인</em></li>
                    <li>7회차부터 <em className="fcg">1,000원 즉시 할인</em></li>
                  </ul>
                </div>
              </div>
              {optionType === '정기구독' &&
                <div className="option cycle">
                  <Radio.Group value={deliveryCycle} className="btn" onChange={(e) => setDeliveryCycle(e.target.value)}>
                    <Radio.Button value="1"><strong>1주 마다</strong></Radio.Button>
                    <Radio.Button value="2"><strong>2주 마다</strong></Radio.Button>
                    <Radio.Button value="3"><strong>3주 마다</strong></Radio.Button>
                  </Radio.Group>
                </div>}
            </>}
            {props.item.optionGroups && props.item.optionGroups.find(option => option.optionGroupType === 'SIZE') && <div className={`option ${showSizeOption}`}>
              <label className="label" onClick={() => props.setShowSizeOption(!props.showOption)}>{optionType ? <>{optionType}사이즈</> : <>사이즈 선택하기</>}</label>
              <span className="value">
                <Radio.Group className="btn" value={optionType} onChange={(e) => {setOptionType(e.target.value);setShowSizeOption(!showSizeOption)}}>
                  {props.item.optionGroups.find(option => option.optionGroupType === 'SIZE').children.map(option => 
                  <Radio.Button value={option.optionGroupName} key={option.optionTemplateId}>{option.optionGroupName}사이즈</Radio.Button>)}
                </Radio.Group>
              </span>
            </div>}
            {props.item.options && props.item.options.length > 0 && <div className={`option ${showOption}`}>
              <label className="label" onClick={() => setShowOption(!showOption)}>{optionName ? <>{props.item.options.find(option => option.ponId === optionName).weightName}</> : <>용량 선택하기</>}</label>
              <span className="value">
                <Radio.Group className="btn" value={optionName} onChange={updateOption}>
                  {props.item.optionGroups && props.item.optionGroups.find(option => option.optionGroupType === 'SIZE')
                    ? optionType
                      ? <>{props.item.options.filter(option => option.sizeName === optionType).map(option => <Radio.Button value={option.ponId} key={option.ponId}>{option.weightName}</Radio.Button>)}</>
                      : <>{props.item.optionGroups.find(option => option.optionGroupType === 'WEIGHT').children.map(option => <Radio.Button value={option.optionGroupName} key={option.optionTemplateId} disabled>{option.optionGroupName}</Radio.Button>)}</>
                    : <>{props.item.options.map(option => <Radio.Button value={option.ponId} key={option.ponId}>{option.optionName}</Radio.Button>)}</>}
                </Radio.Group>
              </span>
            </div>}
          </>
          :
          <div className="qty">
            <InputNumber number={optionQty} min={props.item.productCartLimitCount ? props.item.productCartLimitCount : 1} updateNum={updateQty} />
          </div>
        }
        {props.item.optionUseYn === 'Y' && props.totalPrice.total > 0 && props.totalPrice.option.map(option =>
          <SelectedOptionItem key={option.id} selected={option} item={props.item} totalPrice={props.totalPrice} setTotalPrice={props.setTotalPrice} optionQty={optionQty} setOptionQty={setOptionQty} />
        )}
        <div className="total">
          <label className="label">Total</label>
          <span className="value"><strong>{changePriceFormat(props.totalPrice.total)}원</strong>({props.totalPrice.quantity}개)</span>
        </div>
        <ProductBtns setTotalPrice={props.setTotalPrice} item={props.item} totalPrice={props.totalPrice} className="product_btns" setShowOptionLayer={props.setShowOptionLayer} showOptionLayer={props.showOptionLayer} />
      </div>}
      {props.showOptionLayer && <span onClick={() => props.setShowOptionLayer(!props.showOptionLayer)} className="option_close"></span>}
      <ProductBtns setTotalPrice={props.setTotalPrice} item={props.item} totalPrice={props.totalPrice} className="product_btns" setShowOptionLayer={props.setShowOptionLayer} showOptionLayer={props.showOptionLayer} />
    </>
  )
}
