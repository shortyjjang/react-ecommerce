
import * as actionTypes from './product_types'

export const changePriceFormat = (money) => {
    return Intl.NumberFormat().format(parseInt(money))
}

export const checkout = (items) => {
    return {
        type: actionTypes.ADD_CHECKOUT,
        payload: items
    }
}
export const addToWishlist = async (itemId) => {
    return {
        type: actionTypes.ADD_WISHLIST,
        payload: itemId
    }
}
export const removeWishlist = async (itemId) => {
    return {
        type: actionTypes.REMOVE_WISHLIST,
        payload: itemId
    }
}
