import * as actionTypes from '../_actions/user_types.js';

const INITIAL_USER = {
  username: null,
  nickname: null,
  accessToken: null,
  authenticated: false, //인증여부
  cart: [],
};

export default function user(state = INITIAL_USER, action) {
  switch (action.type) {
    case actionTypes.STORE_LOGIN_USER:
      return {
        ...state,
        username: action.payload.username,
        nickname: action.payload.nickname,
        accessToken: action.payload.accessToken,
        authenticated: action.payload.authenticated,
      };
    case actionTypes.REMOVE_LOGIN_USER:
      return {
        ...state,
        username: null,
        nickname: null,
        accessToken: null,
        authenticated: false,
      };
    case actionTypes.REGISTER_USER:
      return { ...state, register: action.payload };
    case actionTypes.AUTH_USER:
      return { ...state, userData: action.payload };
    case actionTypes.GET_MY_DATA:
      return { ...state, userInfo: action.payload };
    case actionTypes.GET_MY_EARTH:
      return { ...state, userSave: action.payload };
    case actionTypes.GET_CART_ITEMS:
      return { ...state, cart: action.payload };
    case actionTypes.ADD_TO_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
