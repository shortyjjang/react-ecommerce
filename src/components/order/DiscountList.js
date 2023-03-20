import React from 'react'
import { useSelector } from 'react-redux';

export default function DiscountList(props) {
    const products = useSelector(state => state.shop.product)
    const product = products.find(list => list.product_no === props.item.id)
    return (
        <>{product.discount &&
            <ul>
                <li><strong>{product.name}</strong></li>
                {product.discount.map(list => <li key={list.name}><label>{list.name}</label> <span>{list.price}원</span></li>)}
            </ul>
        }</>
    );
}
