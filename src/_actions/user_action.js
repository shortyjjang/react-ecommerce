import * as actionTypes from './user_types';
import Api from '../utils/customAPI';

export const storeLoginUser = (accessToken, username, nickname) => {
  return {
    type: actionTypes.STORE_LOGIN_USER,
    payload: {
      accessToken: accessToken,
      username: username,
      nickname: nickname,
      authenticated: true,
    },
  };
};

export const removeLoginUser = () => {
  return {
    type: actionTypes.REMOVE_LOGIN_USER,
  };
};

export const getMyData = async (id) => {
  let body = {
    params: {
      mallCd: 'cafe24',
      username: id,
    },
  };
  const request = await Api.get('/api/v1/customer/getMypageData', body);
  if(request.status === 200) {
    return {
      type: actionTypes.GET_MY_DATA,
      payload: request.data.result,
    };
  }
};

export const getMyEarth = async (id) => {
  let body = {
    params: {
      mallCd: 'cafe24',
      username: id,
    },
  };
  const request = await Api.get(
    '/api/v1/saveEarth/mypage/getCurrMonthCustomerSaveEarth',
    body,
  );
  if(request.status === 200) {
    return {
      type: actionTypes.GET_MY_EARTH,
      payload: request.data.result,
    };
  }
};

export const registerUser = async dataSubmit => {
  const request = await Api.post('/api/v1/register', dataSubmit).then(
    (res) => res.data,
  );
  return {
    type: actionTypes.REGISTER_USER,
    payload: request,
  };
};

export const auth = async token => {
  const request = await Api.post('/api/v1/auth', { params: token }).then(
    (res) => res.data,
  );
  return {
    type: actionTypes.AUTH_USER,
    payload: request,
  };
};

export const getCartItems = items => {
  return {
      type: actionTypes.GET_CART_ITEMS,
      payload: items
  }
}

export const addToCart = items => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: items,
  };
}