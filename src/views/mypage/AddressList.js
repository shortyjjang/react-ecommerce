import React, { useState } from 'react'
import Address from '../../components/Address';
import MyPageHeader from '../../components/MyPageHeader';
import { Checkbox } from 'antd';
import Postal from '../../components/Postal';

export default function AddressList(props) {
  const [showAddr, setShowAddr] = useState(false);
  const [values, setValue] = useState([]);
  const [showPostal, setShowPostal] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target
    setValue({
      ...values,
      [name]: value
    })
  }
  const setPrimary = (addrNo) => {
  }
  return (
    <>
      <MyPageHeader />
      <div id="contents" className="myhome">
        <div className="inner myshop-wrapper">
          <div className="myshop-header">
            <h2>배송 주소록</h2>
            {!showAddr
              ? <button className="btnNormal" onClick={() => setShowAddr(true)}>신규배송지등록</button>
              : <button className="btnNormal" onClick={() => setShowAddr(false)}>배송지목록</button>
            }
          </div>
          <div className="myshop-inner orderform">
            {!showAddr ? <>
              <h3>배송지 목록</h3>
              <ul className="addressList">
                <li>
                  <strong>
                    <b>[기본]</b> 테스터일
                  </strong>
                  <address>
                    [427703] 경기도 과천시 막계동 서울랜드<br />
                    바이킹 3라인 가운데
                  </address>
                  <small>010-1234-4321</small>
                  <small>02-000-0000</small>
                  <div className="btns">
                    <button className="btnNormal" onClick={() => setShowAddr(true)}>수정</button>
                    <button className="btnNormal">삭제</button>
                  </div>
                </li>
                <li>
                  <strong>테스터일5</strong>
                  <address>
                    [427703] 경기도 과천시 막계동 서울랜드<br />
                    바이킹 3라인 가운데
                  </address>
                  <small>010-1234-4321</small>
                  <small>02-000-0000</small>
                  <div className="btns">
                    <button className="btnNormal btn_primary">고정</button>
                    <button className="btnNormal" onClick={() => setShowAddr(true)}>수정</button>
                    <button className="btnNormal">삭제</button>
                  </div>
                </li>
              </ul>
            </>
              : <>
                <h3>배송지 등록</h3>
                <form>
                  <div className="newAddress">
                    <Address values={values} onChange={onChange} setShowPostal={setShowPostal} />
                    <Checkbox onChange={() => setPrimary('12')}>기본배송지로 지정</Checkbox>
                  </div>
                  <div className="userbtn-area">
                    <button type="submit" className="btnNormal">등록</button>
                    <button className="btnNormal" onClick={() => setShowAddr(false)}>취소</button>
                  </div>
                </form>
                <Postal showPostal={showPostal} setShowPostal={setShowPostal} setAddress={(postal, addr1, addr2) => { setValue({ ...props.values, postcode1: postal, addr1: addr1, addr2: addr2 }); setShowPostal(false) }} />
              </>}
          </div>
        </div>
      </div>
    </>
  )
}
