import React, { useEffect, useState } from 'react'
import ProductFrm from './ProductFrm';
import { Modal } from 'antd';
import Api from '../../utils/customAPI';

export default function AddCart(props) {
  const [totalPrice, setTotalPrice] = useState({
    total: 0,
    quantity: 0,
    option: [],
  });
  const [item, setItem] = useState(null)
  useEffect(() => {
    
    const callItem = async () => {
      const request = await Api.get('/api/v1/app/product/getProductIdForSale', {
        params: { productId: props.cartItem.productId },
      }).then((response) => response.data.result);
      setItem(request)
      if(request.optionUseYn === 'N') {
        setTotalPrice({
          ...totalPrice,
          total: request.productSalePrice,
          quantity: request.productCartLimitCount,
        });
      }
    }
    if(!item) callItem()
  },[])
  const getTotalPrice = (totalPrice) => {
    let totalqty = 0,
    totalprice = 0;
    if (totalPrice.option.length > 0) {
    totalPrice.option.map((selected) => {
      totalqty += selected.quantity;
      totalprice += selected.sales_price;
    });
    setTotalPrice({ ...totalPrice, quantity: totalqty, total: totalprice });
    }
  };
  return (
    <Modal title={props.cartItem.productName}
    visible={props.showCart} 
    onOk={() => props.setShowCart(false)} 
    onCancel={() => props.setShowCart(false)}
    className="add_cart"
    >
    {item && <ProductFrm
      item={item}
      totalPrice={totalPrice}
      setTotalPrice={setTotalPrice}
      getTotalPrice={getTotalPrice}
      showOptionLayer={props.showCart}
      setShowOptionLayer={props.setShowCart}
    />}
    </Modal>
  )
}
