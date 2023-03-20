import React, { useState } from 'react';
import { Select, Radio } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons'

const { Option } = Select;

export default function FindID(props) {
  const [values, setValue] = useState({
    check_method: 'check_method1',
    searchType: 'indi'
  })
  const [isMember, setIsMember] = useState(false)
  const find_id = (e) => {
    e.preventDefault();
    if (values.check_method === 'check_method1') {
      if (!values.name || !values.email) {
        alert('모든 항목을 입력하세요');
      }
      else // if() 유저중 아이디가 있다면
      {
        setIsMember(true)
      }
    } else {
      if (!values.name || !values.mobile1 || !values.mobile2 || !values.mobile3) {
        alert('모든 항목을 입력하세요');;
      }
      else // if() 유저중 아이디가 있다면
      {
        setIsMember(true)
      }
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value
    })
  }
  return (
    <div id="contents" className="sign">
      <h2 className="titleArea">아이디 찾기</h2>
      {!isMember
        ? <>
          <p className="info">가입하신 방법에 따라 아이디 찾기가 가능합니다.<br />
            법인사업자 회원 또는 외국인 회원의 경우 법인명과 법인번호 또는 이름과 등록번호를 입력해 주세요.</p>
          <form onSubmit={find_id}>
            <div className="find_id">
              <fieldset>
                <legend>아이디 찾기</legend>
                <div className="frm_row">
                  <label className="frm_row-label">회원구분</label>
                  <Select defaultValue={values.searchType} name="searchType" onChange={(value) => setValue({ ...values, searchType: value })}>
                    <Option value="indi">개인회원</Option>
                    <Option value="indibuis">개인 사업자회원</Option>
                    <Option value="corp">법인 사업자회원</Option>
                    <Option value="fore">외국인회원</Option>
                  </Select>
                </div>
                <div className="frm_row">
                  <label className="frm_row-label">인증방법</label>
                  <Radio.Group onChange={onChange} name="check_method" value={values.check_method}>
                    <Radio value={'check_method1'}>이메일</Radio>
                    <Radio value={'check_method2'}>휴대폰번호</Radio>
                  </Radio.Group>
                </div>
                <div className="frm_row">
                  <label className="frm_row-label">이름</label>
                  <input type="text" name="name" onChange={onChange} value={values.name} />
                </div>
                {values.check_method === 'check_method1' ?
                  <div className="frm_row">
                    <label className="frm_row-label">이메일</label>
                    <input type="text" name="email" onChange={onChange} value={values.email} />
                  </div>
                  :
                  <div className="frm_row mobile">
                    <label className="frm_row-label">휴대폰 번호</label>
                    <span>
                      <input type="text" name="mobile1" onChange={onChange} value={values.mobile1} /> -
                      <input type="text" name="mobile2" onChange={onChange} value={values.mobile2} /> -
                      <input type="text" name="mobile3" onChange={onChange} value={values.mobile3} />
                    </span>
                  </div>
                }
                <button type="submit" className="btnNormal">확인</button>
              </fieldset>
            </div>
          </form>
        </>
        : <>
          <p className="info">아이디 찾기가 성공적으로 이루어졌습니다.</p>
          <div className="finded_id">
            <p><SearchOutlined />다음정보로 가입된 아이디가 총 2개 있습니다.</p>
            <div className="frm_row">
              <label className="frm_row-label">이름</label>
              <strong>김미란</strong>
            </div>
            <div className="frm_row">
              <label className="frm_row-label">{values.check_method === 'check_method1' ? '이메일' : '휴대폰 번호'}</label>
              {values.check_method === 'check_method1'
                ? <span>{values.email}</span>
                : <span>{values.mobile1} - {values.mobile2} - {values.mobile3}</span>
              }
            </div>
            <ul>
              <li><CheckOutlined />kim***** (개인회원, {moment('2022-03-14').format('YYYY-MM-DD')} 가입)</li>
              <li><CheckOutlined />198******** (개인회원, {moment('2022-04-13').format('YYYY-MM-DD')} 가입)</li>
            </ul>
            <div className="btns">
              <Link to="/login" className="btnNormal">로그인하기</Link>
              <Link to="/member/find_passwd_info" className="btnNormal">비밀번호찾기</Link>
            </div>
          </div>
        </>
      }
    </div>
  );
}
