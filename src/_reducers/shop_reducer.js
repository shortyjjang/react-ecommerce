import * as actionTypes from '../_actions/shop_types.js';

const INITIAL_SHOP = {
    banner: [],
    board: [],
    product: [],
    showTopCopy: false,
    showMember: null
}

export default function shop(state = INITIAL_SHOP, action) {
    switch (action.type) {
        case actionTypes.GET_BANNER:
            return { ...state, banner: action.payload }
        case actionTypes.GET_PRODUCT:
            return { ...state, product: action.payload }
        case actionTypes.SHOW_TOP_COPY:
            return { ...state, showTopCopy: action.payload }
        case actionTypes.GET_FAQ:
            return { ...state, board: { ...state.board, faq: action.payload } }
        case actionTypes.GET_NOTICE:
            return { ...state, board: { ...state.board, notice: action.payload } }
        case actionTypes.GET_QNA:
            return { ...state, board: { ...state.board, qna: action.payload } }
        case actionTypes.GET_REVIEW:
            return { ...state, board: { ...state.board, review: action.payload } }
        case actionTypes.ONLY_MEMBER:
            return { ...state, showMember: action.payload }
        default:
            return state;
    }
}