import axios from 'axios';
import { refresh, refreshErrorHandle } from './refresh';

// export const ATD_API_BASIC_PATH = `${process.env.REACT_APP_ATD_API_BASIC_PATH}`;
export const ATD_API_BASIC_PATH = 'https://qa-api.a2dcorp.co.kr'
export const IMG_SERVER =
  'https://all-to-delicious.s3.ap-northeast-2.amazonaws.com/';

const Api = axios.create({
  baseURL: ATD_API_BASIC_PATH,
  timeout: 10000,
  params: {},
  headers: {},
});

Api.interceptors.request.use(refresh, refreshErrorHandle);
export default Api;