import axios, { AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';
import { ATD_API_BASIC_PATH } from './customAPI';
import dayjs from 'dayjs';

export const refresh = async (AxiosRequestConfig) => {
  const refreshToken = Cookie.get('refreshToken');
  const expireAt = Cookie.get('expiresAt');
  let token = Cookie.get('accessToken');

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (dayjs(expireAt).diff(dayjs()) < 0 && refreshToken) {
    const body = {
      refreshToken,
    };

    // 토큰 갱신 서버통신
    const { data } = await axios.post(`${ATD_API_BASIC_PATH}/auth/token`, body);

    token = data.data.accessToken;
    Cookie.set('accessToken', data.data.accessToken, { path: '/' });
    Cookie.set(
      'expiresAt',
      dayjs().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss'),
      { path: '/' },
    );
  }

  // AxiosRequestConfig.headers['Authorization'] = `Bearer ${token}`;

  return AxiosRequestConfig;
};
export const refreshErrorHandle = (err) => {
  Cookie.remove('refreshToken');
};
