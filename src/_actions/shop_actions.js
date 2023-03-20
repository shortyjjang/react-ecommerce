import * as actionTypes from './shop_types';
import Api from '../utils/customAPI';
import axios from 'axios';

export const getProduct = async (body) => {
  const request = await Api.get('/api/v1/app/product/getProductIdForSale', {
    params: body,
  }).then((response) => response.data.result);
  return request;
};
export const getBanner = async (body) => {
  const request = await Api.get('/api/v1/pop_banner', { params: body }).then(
    (res) => res.data.result,
  );
  return {
    type: actionTypes.GET_BANNER,
    payload: request,
  };
};
export const getFaq = (body) => {
  const request = [
    {
      id: 5,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      type: '공지',
      fixed: false,
      category: '정기구독문의',
      subject: '1월 정기구독 배송 일정이 궁금해요',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 4,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      type: '상품문의',
      fixed: true,
      category: '이벤트',
      subject: '못 먹는 채소가 있는데 선택 가능한가요?',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 3,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      type: '안내',
      fixed: false,
      category: '상품문의',
      subject: '어떤 채소들이 도착하나요?',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 2,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      type: '안내',
      fixed: false,
      category: '주문/결제문의',
      subject: '매주 배송되는 채소를 다 소진하지 못했어요',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
  ];
  return {
    type: actionTypes.GET_FAQ,
    payload: request,
  };
};
export const getNotice = (body) => {
  const request = [
    {
      id: 5,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      fixed: '공지',
      category: '알림',
      subject:
        '어스박스 택배사 변경에 따른 배송비 인상 안내 (3월 16일 09시 이후 주문건 부터)	',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 4,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      fixed: true,
      category: '안내',
      subject:
        '어스박스 택배사 변경에 따른 배송비 인상 안내 (3월 16일 09시 이후 주문건 부터)	',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 3,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      fixed: false,
      category: '이벤트',
      subject:
        '어스박스 택배사 변경에 따른 배송비 인상 안내 (3월 16일 09시 이후 주문건 부터)	',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 2,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      hit: 116,
      fixed: false,
      category: '당첨자',
      subject:
        '어스박스 택배사 변경에 따른 배송비 인상 안내 (3월 16일 09시 이후 주문건 부터)	',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
  ];
  return {
    type: actionTypes.GET_NOTICE,
    payload: request,
  };
};
export const getQna = (body) => {
  const request = [
    {
      id: 5,
      writer: '이***',
      createdAt: '2022-03-11 12:56:37',
      hit: 116,
      category: '상품문의',
      subject: '1:1 문의 드립니다.',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      reply: '',
      secret: true,
      secure_password: '1111',
    },
    {
      id: 4,
      writer: '박***',
      createdAt: '2022-03-11 12:56:37',
      hit: 116,
      category: '기타문의',
      subject: '1:1 문의 드립니다.',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      reply: {
        id: 7,
        writer: '예스어스',
        createdAt: '2022-03-11 12:56:37',
        hit: 116,
        category: '기타문의',
        subject: '안녕하세요 예스어스입니다.',
        secret: true,
        content:
          '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      },
      secret: true,
      secure_password: '1111',
    },
    {
      id: 3,
      writer: '한***',
      createdAt: '2022-03-11 12:56:37',
      hit: 116,
      category: '취소문의',
      subject: '1:1 문의 드립니다.',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      reply: {
        id: 8,
        writer: '예스어스',
        createdAt: '2022-03-11 12:56:37',
        hit: 116,
        category: '기타문의',
        secret: true,
        subject: '안녕하세요 예스어스입니다.',
        content:
          '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      },
      secret: true,
      secure_password: '1111',
    },
    {
      id: 2,
      writer: '신***',
      createdAt: '2022-03-11 12:56:37',
      hit: 116,
      category: '상품문의',
      subject: '1:1 문의 드립니다.',
      secret: true,
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      reply: {
        id: 9,
        writer: '예스어스',
        createdAt: '2022-03-11 12:56:37',
        secret: true,
        hit: 116,
        category: '기타문의',
        subject: '안녕하세요 예스어스입니다.',
        content:
          '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
      },
      secure_password: '1111',
    },
  ];
  return {
    type: actionTypes.GET_QNA,
    payload: request,
  };
};
export const getReview = (body) => {
  const request = [
    {
      id: 5,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      vote: 116,
      fixed: false,
      best: true,
      product_no: 25,
      score: 5,
      subject: '두번째 받은 상품도 완전 만족♡',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 4,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      vote: 116,
      fixed: true,
      new: true,
      product_no: 22,
      score: 2,
      subject: '구독 대만족',
      file: [
        '//yes-us.co.kr/file_data/g9intable/2022/03/14/584ed240a8d52500b79479b4536042b3.jpg',
        '//yes-us.co.kr/file_data/g9intable/2022/03/14/a05c2c1c0599c06e0a004c708a35a8c2.jpg',
      ],
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 3,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      vote: 116,
      fixed: false,
      product_no: 22,
      score: 4,
      subject: '정말 달고 맛있어요~',
      file: [
        '//yes-us.co.kr/file_data/g9intable/2022/03/14/584ed240a8d52500b79479b4536042b3.jpg',
        '//yes-us.co.kr/file_data/g9intable/2022/03/14/a05c2c1c0599c06e0a004c708a35a8c2.jpg',
      ],
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
    {
      id: 2,
      writer: '예스어스',
      createdAt: '2022-03-11 12:56:37	',
      vote: 116,
      fixed: false,
      product_no: 22,
      score: 5,
      subject: '아니 진짜 솔직히',
      content:
        '<p>안녕하세요, 예스어스입니다.</p><p><br></p><p>2022년 3/16(수) 부터 어스박스의 배송업체가 "CJ 대한통운 택배"에서 "우체국 택배"로 변경됨을 알려드립니다.</p><p><br></p><p>그간 어스박스는 CJ대한통운을 주로 이용하였으나&nbsp;</p><p>최근 배송 안정성 및 서비스 품질 향상을 위해 우체국으로 주 거래 택배사를 변경하게 되었습니다.</p><p><br></p><p>■ 적용 일시 : <strong>3/16(수) 오전 9시 이후 주문건부터</strong></p><p><span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">■ 택배사 변경 : CJ 대한통운 택배 <span style="color: rgb(0, 0, 0); font-family: &quot;Malgun Gothic&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;">→&nbsp;</span> <strong>우체국 택배</strong></span></p><p>■ 배송비 변경 : 3,000원 → <strong>4,000원</strong></p><p><br></p><p><br></p><p>조금 비싸더라도 보다 나은 배송 품질을 제공하고자 함이니 고객님들의 너른 양해 부탁드립니다.</p><p><br></p><p>향후 어스박스 주문이 더 많이 늘어나고 계약물류 단가가 낮아지게 되면 배송비를 인하할 계획이니 많은 성원 부탁드립니다.</p><p><br></p><p><strong>* 농가 직송하는 단품 상품의 경우 기존과 동일하게 복수의 택배사가 운용되며 배송비 인상은 해당되지 않습니다.</strong></p><p><br></p><p>감사합니다.</p><p><br></p><p>지구를 살리는 장보기의 시작</p><p>예스어스 드림</p><p><br></p>',
    },
  ];
  return {
    type: actionTypes.GET_REVIEW,
    payload: request,
  };
};
