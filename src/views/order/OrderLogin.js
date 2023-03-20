import React, { useState } from 'react';

export default function OrderLogin(props) {
  const [value, setValue] = useState({})
  const guest_order = (e) => {
    e.preventDefault();
  }
  const onChange = (e) => {
    const { name, val } = e.target;
    setValue({
      ...value,
      [name]: val
    })
  }
  return (
    <div id="contents" className="sign">
      <h2 className="titleArea">비회원 주문조회</h2>
      <form onSubmit={guest_order}>
        <div className="login">
          <fieldset>
            <legend>비회원 주문조회</legend>
            <input name="order_name" type="text" placeholder="주문자명" onChange={onChange} value={value.order_name} />
            <input name="order_id" type="text" placeholder="주문번호(하이픈(-) 포함)" onChange={onChange} value={value.order_id} />
            <input name="order_password" type="password" autoComplete='off' placeholder="비회원 주문 패스워드" onChange={onChange} value={value.member_passwd} />
            <button type="submit" className="btnLogin">조회</button>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
