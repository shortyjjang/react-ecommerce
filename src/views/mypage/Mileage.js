import React from 'react'
import MyPageHeader from '../../components/MyPageHeader';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function Mileage(props) {
  return (
    <>
      <MyPageHeader />
      <div id="contents" className="myhome">
        <div className="inner myshop-wrapper">
          <div className="myshop-header">
            <h2>적립금 내역</h2>
          </div>
          <div className="myshop-inner">
            <ul className="mileage_total">
              <li><label>총 적립금</label> <b>1,027,360원</b></li>
              <li><label>사용가능 적립금</label> <b>85,400원</b></li>
              <li><label>사용된 적립금</label> <span>915,600원</span></li>
              <li><label>미가용 적립금</label> <span>26,360원</span></li>
              <li><label>환불예정 적립금</label> <span>0원</span></li>
            </ul>
            <Collapse expandIconPosition="right" className="mileage_list">
              <Panel header="적립 내역 보기" key="1" >
                <dl>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>내용</label> 적립금 복원(주문취소)</dd>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>내용</label> 적립금 복원(주문취소)</dd>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>내용</label> 적립금 복원(주문취소)</dd>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>내용</label> 적립금 복원(주문취소)</dd>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>내용</label> 적립금 복원(주문취소)</dd>
                </dl>
              </Panel>
              <Panel header="미가용 적립 내역 보기" key="2" >
                <dl>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>사용가능 예정일</label> 배송완료후 7일 후 사용가능</dd>
                  <dd><label>내용</label> 구매에 대한 적립금</dd>
                  <dt><Link to="/order/detail/20220106-0000131">2022-01-06 <span>(20220106-0000131)</span></Link></dt>
                  <dd><label>적립금</label> 34,000원</dd>
                  <dd><label>사용가능 예정일</label> 배송완료후 20일 후 사용가능</dd>
                  <dd><label>내용</label> 구매에 대한 적립금</dd>
                </dl>
              </Panel>
              <Panel header="미가용 쿠폰/회원등급 적립 내역" key="3" >
                <div className="empty">
                  적립내역이 없습니다.
                </div>
              </Panel>
            </Collapse>
            <h3 className="mileage_guide"><ExclamationCircleOutlined />적립금 안내</h3>
            <ol className="mileage_guide">
              <li>주문으로 발생한 적립금은 배송완료 후 7일 부터 실제 사용 가능한 적립금으로 전환됩니다.<br />배송완료 시점으로부터 7일 동안은 미가용 적립금으로 분류됩니다. </li>
              <li>미가용 적립금은 반품, 구매취소 등을 대비한 임시 적립금으로 사용가능 적립금으로 전환되기까지 상품구매에 사용하실 수 없습니다.</li>
              <li>사용가능 적립금(총적립금 - 사용된적립금 - 미가용적립금)은 상품구매 시 바로 사용가능합니다.</li>
              <li>적립금의 유효기간은 1년이며, 매년 12월 31일 자동으로 소멸됩니다. (소멸일 기준 1년 전 적립금)</li>
              <li>소멸 적립금은 소멸 30일 전 등록된 회원 이메일 및 SMS로 안내됩니다.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
