import * as actionTypes from '../_actions/product_types.js';

const INITIAL_PRODUCT = {
    currentPrd: [],
    wishlist: []
}

export default function product(state = INITIAL_PRODUCT, action) {
    switch (action.type) {
        case actionTypes.ADD_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.find(item => item === action.payload)
                    ? state.wishlist
                    : [...state.wishlist, action.payload]

            }
        case actionTypes.REMOVE_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item !== action.payload)
            }
        case actionTypes.ADD_CHECKOUT:
            return {
                ...state,
                currentPrd: action.payload
            }
        default:
            return state;
    }
}