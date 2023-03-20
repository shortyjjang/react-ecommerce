import React, { useState, useEffect } from 'react';
import { Select, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IssuesCloseOutlined } from '@ant-design/icons'

const { Option } = Select;

function CheckVerify(props) {
  return (
    <form onSubmit={props.check_verification}>
      <div className="find_id">
        <fieldset>
          <legend>비밀번호 찾기</legend>
          <div className="frm_row">
            <label className="frm_row-label">인증방법</label>
            <span className="frm_row_val">{props.values.check_method === 'check_method1' ? '이메일' : '휴대폰번호'}</span>
          </div>
          <div className="frm_row">
            <label className="frm_row-label">{props.values.check_method === 'check_method1' ? '이메일' : '휴대폰번호'}</label>
            {props.values.check_method === 'check_method1'
              ? <span className="frm_row_val">{props.values.email}</span>
              : <span className="frm_row_val">{props.values.mobile1} - {props.values.mobile2} - {props.values.mobile3}</span>
            }
          </div>
          <div className="frm_row">
            <label className="frm_row-label">인증번호</label>
            <input type="text" name="verification" onChange={props.onChange} value={props.values.verification} autoComplete="false" />
          </div>
          <div className="notify">
            <IssuesCloseOutlined /> 1회 발송된 인증번호의 유효 시간은 3분이며, 1회 인증번호 발송 후 30초 이후에 재전송이 가능합니다.
          </div>
          <div className="btns">
            <button type="submit" className="btnNormal">확인</button>
            <button onClick={() => { props.setIsmarked(false); props.setValue({ check_method: 'check_method1', searchType: 'indi' }) }} className="btnNormal">취소</button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}

function FindPwFst(props) {
  return (
    <form onSubmit={props.find_pw}>
      <div className="find_id">
        <fieldset>
          <legend>비밀번호 찾기</legend>
          <div className="frm_row">
            <label className="frm_row-label">회원구분</label>
            <Select defaultValue={props.values.searchType} name="searchType" onChange={(value) => setValue({ ...props.values, searchType: value })}>
              <Option value="indi">개인회원</Option>
              <Option value="indibuis">개인 사업자회원</Option>
              <Option value="corp">법인 사업자회원</Option>
              <Option value="fore">외국인회원</Option>
            </Select>
          </div>
          <div className="frm_row">
            <label className="frm_row-label">인증방법</label>
            <Radio.Group onChange={props.onChange} name="check_method" value={props.values.check_method}>
              <Radio value={'check_method1'}>이메일</Radio>
              <Radio value={'check_method2'}>휴대폰번호</Radio>
            </Radio.Group>
          </div>
          <div className="frm_row">
            <label className="frm_row-label">아이디</label>
            <input type="text" name="member_id" onChange={props.onChange} value={props.values.member_id} />
          </div>
          <div className="frm_row">
            <label className="frm_row-label">이름</label>
            <input type="text" name="name" onChange={props.onChange} value={props.values.name} />
          </div>
          {props.values.check_method === 'check_method1' ? <div className="frm_row">
            <label className="frm_row-label">이메일</label>
            <input type="text" name="email" onChange={props.onChange} value={props.values.email} />
          </div>
            : <div className="frm_row mobile">
              <label className="frm_row-label">휴대폰 번호</label>
              <span>
                <input type="text" name="mobile1" onChange={props.onChange} value={props.values.mobile1} /> -
                <input type="text" name="mobile2" onChange={props.onChange} value={props.values.mobile2} /> -
                <input type="text" name="mobile3" onChange={props.onChange} value={props.values.mobile3} />
              </span>
            </div>
          }
          <button type="submit" className="btnNormal">확인</button>
        </fieldset>
      </div>
    </form>
  )
}

export default function FindPw(props) {
  const [isverify, setIsverify] = useState(false)
  const [values, setValue] = useState({
    check_method: 'check_method1',
    searchType: 'indi'
  })
  const [ismarked, setIsmarked] = useState(false)
  const find_pw = (e) => {
    e.preventDefault();
    if (values.check_method === 'check_method1') {
      if (!values.name || !values.email || !values.member_id) {
        alert('모든 항목을 입력하세요');
      }
      else // if() 모든 사항을 입력했다면
      {
        setIsmarked(true)
      }
    } else {
      if (!values.name || !values.mobile1 || !values.mobile2 || !values.mobile3 || !values.member_id) {
        alert('모든 항목을 입력하세요');
      }
      else // if() 모든 사항을 입력했다면
      {
        setIsmarked(true)
      }
    }
  }
  const check_verification = (e) => {
    e.preventDefault();
    setIsverify(true)
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
      {!isverify ? <>
        <h2 className="titleArea">비밀번호 찾기</h2>
        {!ismarked 
        ? <FindPwFst onChange={onChange} values={values} setValue={setValue} setIsmarked={setIsmarked} find_pw={find_pw} />
        : <CheckVerify check_verification={check_verification} onChange={onChange} setIsmarked={setIsmarked} values={values} setValue={setValue}/>
        }
      </>
      : <ResetPw values={values} />}
    </div>
  );
}
function ResetPw(props) {
  const [pw, setPw] = useState({
    password: '',
    chk_password:''
  })
  const navigate = useNavigate()
  const onChange = (e) =>{
    const {name, value} = e.target
    setPw({
      ...pw,
      [name]: value
    })
  }
  const resetPw = (e) => {
    e.preventDefault();
    if(pw.password === pw.chk_password) {
      navigate('/')
    }
  }
  return(
    <div id="contents" className="sign">
    <h2 className="titleArea">비밀번호 재설정</h2>
    <form onSubmit={resetPw}>
      <div className="find_id">
        <fieldset>
          <legend>비밀번호 찾기</legend>
          <div className="frm_row">
            <label className="frm_row-label">아이디</label>
            <span className="frm_row_val">{props.values.member_id}</span>
          </div>
          <div className="frm_row">
            <label className="frm_row-label">새 비밀번호</label>
            <input type="text" name="password" onChange={onChange} value={pw.password} />
          </div>
          <div className="frm_row">
            <label className="frm_row-label">새 비밀번호 확인</label>
            <input type="text" name="chk_password" onChange={onChange} value={pw.chk_password} />
          </div>
          <button type="submit" className="btnNormal">확인</button>
        </fieldset>
      </div>
    </form>
    </div>
  )
}
