import React, { useState } from 'react'
import {CloseOutlined} from '@ant-design/icons'
import InputNumber from '../InputNumber';

export default function SelectedOptionItem(props) {
  const selected = props.selected;
  const option = props.item.options ? props.item.options.find(option => option.ponId === selected.id) : null;
  const [optionQty, setOptionQty] = useState(props.item.productCartLimitCount);
  const updateQty = (qty) => {
    qty = parseInt(qty)
    setOptionQty(qty)
    let totalqty = 0, totalprice = 0, newOption = {
        ...selected,
        quantity: qty,
        sales_price: parseInt(option.salePrice) * parseInt(qty)
    };
    props.totalPrice.option.filter(opt => opt.id !== selected.id).map(opt => {
      totalqty += opt.quantity;
      totalprice += opt.sales_price;
    })
    totalqty += qty
    totalprice += newOption.sales_price
    props.setTotalPrice({
        ...props.totalPrice,
        quantity: totalqty,
        total: totalprice,
        option: props.totalPrice.option.map(option => option.id === selected.id ? newOption : option)
    })
  }
  const removeOptions = () => {
    const currentOption = props.totalPrice.option.find(option => option.id === selected.id)
    const newOption = props.totalPrice.option.filter(option => option.id !== selected.id)
    props.setTotalPrice({
        ...props.totalPrice,
        quantity: props.totalPrice.quantity - currentOption.quantity,
        total: props.totalPrice.total - currentOption.sales_price,
        option: newOption
    })
  }
  return (
    <div className="selectedOptions">
      <div className="selectedOptions-header">{option.optionName}</div>
      <InputNumber number={optionQty} min={props.item.productCartLimitCount} updateNum={updateQty} />
      <button className="remove" onClick={removeOptions}><CloseOutlined /></button>
    </div>
  )
}
