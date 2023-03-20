import React, { useState } from 'react'
import MyPageHeader from '../../components/MyPageHeader';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Checkbox, Collapse } from 'antd';
import Api from '../../utils/customAPI';

const { Panel } = Collapse;

export default function Coupon(props) {
  const [couponCode, setCouponCode] = useState('')
  const [selectedCoupon, setSelectCoupon] = useState([])
  const coupon_code_submit = async (e) => {
    e.preventDefault();
    const request = await Api.post('/exec/front/myshop/couponSerial', { coupon_code: couponCode })

  }
  const selectCoupon = (e) => {
    const value = e.target.value
    if(selectedCoupon.find(coupon => coupon === value)) {
      setSelectCoupon(selectedCoupon.filter(coupon => coupon !== value))
    }else{
      setSelectCoupon([...selectedCoupon, value])
    }
  }
  return (
    <>
      <MyPageHeader />
      <div id="contents" className="myhome">
        <div className="inner myshop-wrapper">
          <div className="myshop-header">
            <h2>쿠폰등록 및 조회</h2>
          </div>
          <div className="myshop-inner">
            <h3>쿠폰인증번호 등록하기</h3>
            <form onSubmit={coupon_code_submit} className="coupon-add">
              <div className="frm_row">
                <input name="coupon_code" className="inputTypeText" maxLength="35" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} type="text" />
                <button type="submit" className="btnNormal">쿠폰번호인증</button>
              </div>
              <p><ExclamationCircleOutlined /> 10~35자 일련번호 "-" 제외<br />쇼핑몰에서 발행한 쿠폰번호만 입력해주세요.</p>
            </form>
            <div className="myshop-couponlist">
              <h3>쿠폰 목록(총 3장)</h3>
              <div className="myshop-couponlist-header">
                <span className="ant-collapse-header">쿠폰명</span>
                <span className="discount">할인</span>
                <span className="reserve">적립</span>
              </div>
              <Collapse expandIconPosition="end">
                <Panel header="쿠폰 테스트 A" key="1" extra={<>
                  <div className="discount">-</div>
                  <div className="reserve">-</div>
                </>}>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰번호 : </label>
                    <span><Checkbox onChange={selectCoupon} value="coupon1" checked={selectedCoupon.find(coupon => coupon === value)} /></span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">구매금액 :</label>
                    <span> 제한없음</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">결제수단 :</label>
                    <span>제한없음</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰혜택 :</label>
                    <span>기본 배송비 할인<br />(지역별 배송비 포함)</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">할인액(률) :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">적립액(률) :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">예치금 :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">사용가능 기간 :</label>
                    <span>2021-11-25 00:00:00 ~ 2026-12-31 23:00:00</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰적용상품 :</label>
                    <span>전체상품</span>
                  </div>
                </Panel>
                <Panel header="쿠폰 테스트 B" key="2" extra={<>
                  <div className="discount">-</div>
                  <div className="reserve">-</div>
                </>}>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰번호 : </label>
                    <span><Checkbox onChange={selectCoupon} value="coupon1" checked={selectedCoupon.find(coupon => coupon === value)} /></span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">구매금액 :</label>
                    <span> 제한없음</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">결제수단 :</label>
                    <span>제한없음</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰혜택 :</label>
                    <span>기본 배송비 할인<br />(지역별 배송비 포함)</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">할인액(률) :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">적립액(률) :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">예치금 :</label>
                    <span> -</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">사용가능 기간 :</label>
                    <span>2021-11-25 00:00:00 ~ 2026-12-31 23:00:00</span>
                  </div>
                  <div className="frm_row">
                    <label className="frm_row-label">쿠폰적용상품 :</label>
                    <span>전체상품</span>
                  </div>
                </Panel>
              </Collapse>
              <p className="empty">
                보유하고 계신 쿠폰 내역이 없습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
