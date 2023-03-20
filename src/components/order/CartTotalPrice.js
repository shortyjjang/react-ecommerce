import React from 'react';
import { useSelector } from 'react-redux';

function CartTotalPrice(props) {
    const products = useSelector(state => state.shop.product)
    const product = products.find(item => item.product_no === props.item.id)
    return (
        <>
            <p>
                상품구매금액 <strong>{product.product_sale_price * props.item.quantity}</strong>
                + 배송비 <strong>{product.product_delivery_price}</strong>
                {/* - 상품할인금액 <strong></strong> */}
                =
            </p>
            <p className="total">
                합계 : <strong>{(product.product_sale_price * props.item.quantity) + product.product_delivery_price}</strong>원
            </p>
        </>
    );
}

export default CartTotalPrice;