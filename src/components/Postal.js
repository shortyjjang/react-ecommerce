import React, { useState } from 'react'
import { Modal, Tabs } from 'antd';
import Api from '../utils/customAPI';

const { TabPane } = Tabs;

export default function Postal(props) {
  const [searchAddr, setSearchAddr] = useState('')
  const [addressList, setAddress] = useState([])
  const searchOldAddr = (e) => {
    e.preventDefault();
    /*let body = {
      search: searchAddr
    }
    try {
      const request = Api.get('',{params: body})
      setAddress(request.data.result)
    }catch(err) {console.log(err)}*/
  }
  const searchNewAddr = (e) => {
    e.preventDefault(); 
    /*let body = {
      search: searchAddr
    }
    try {
      const request = Api.get('',{params: body})
      setAddress(request.data.result)
    }catch(err) {console.log(err)}*/
  }
  return (
    <Modal title="우편번호 검색" visible={props.showPostal} 
    // onOk={() => props.setShowPostal(false)} onCancel={() => props.setShowPostal(false)} 
    className="postalModal">
      <Tabs>
        <TabPane tab="새 우편번호" key="1">
          <form>
            <div className="frm_row">
              <label className="frm_row-label">도로명</label>
              <input type="text" value={searchAddr} onChange={(e) => setSearchAddr(e.target.value)} />
              <button type="submit">검색</button>
              <small>도로명+건물번호(예:테헤란로5)</small>
            </div>
          </form>
          <ul className="addr_list">
            {/* {addressLists.map(addr => 
              <li key={addr.postalCode}>
                <button className="streetLine" onClick={() => props.setAddress(addr.postalCode,addr.street1,addr.street2)}>
                  <span className="icoStreet">도로명</span>
                  {addr.street1}
                  {addr.street2}
                </button>
                <button className="numberLine" onClick={() => props.setAddress(addr.postalCode,addr.number1,addr.number2)}>
                  <span className="icoNumber">지번</span>
                  {addr.number1}
                  {addr.number2}
                </button>
                <span className="code">{addr.postalCode}</span>
              </li>
            )} */}
          </ul>
        </TabPane>
        <TabPane tab="구) 우편번호" key="2">
          <form>
            <div className="frm_row">
              <label className="frm_row-label">지번</label>
              <input type="text" value={searchAddr} onChange={(e) => setSearchAddr(e.target.value)} />
              <button type="submit">검색</button>
              <small>읍/면/동/리+지번(예:서린동154)</small>
            </div>
          </form>
          <ul className="addr_list">
            <li>
              <button className="streetLine" onClick={() => props.setAddress('12771','경기도 광주시 오포읍 상태길81번길 19-17','펠리체아일랜드')}>
                <span className="icoStreet">도로명</span>
                경기도 광주시 오포읍 상태길81번길 19-17 펠리체아일랜드
              </button>
              <button className="numberLine" onClick={() => props.setAddress('12771','경기도 광주시 오포읍 신현리 855-25','펠리체아일랜드')}>
                <span className="icoNumber">지번</span>
                경기도 광주시 오포읍 신현리 855-25 펠리체아일랜드
              </button>
              <span className="code">12771</span>
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </Modal>
  )
}
