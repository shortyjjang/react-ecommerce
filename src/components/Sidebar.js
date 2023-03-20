import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function Sidebar(props) {
  let isLogin = useSelector(state => state.user.authenticated);
  const [headerH, setHeaderH] = useState(0)
  useEffect(() => {
    if (props.fixHeader === 'fixed') {
      setHeaderH(document.querySelector('#header').clientHeight)
    } else if(document.querySelector('.sales_text')) {
      setHeaderH(document.querySelector('#header').clientHeight + document.querySelector('.sales_text').clientHeight)
    }
  }, [props.fixHeader, document.querySelector('.sales_text')])
  return (
    <aside id="sidebar" className={props.collapsed ? `collapse ${props.fixHeader}` : props.fixHeader} style={{
      marginTop: `${props.fixHeader !== 'fixed' && document.querySelector('.sales_text') ? document.querySelector('.sales_text').clientHeight : 0}px`,
      height: `${window.innerWidth < 720
        ? window.innerHeight - headerH :
        window.innerHeight}px`
    }}>
      <Collapse defaultActiveKey={['1', '2', '3']} ghost expandIconPosition={'end'}>
        <Panel header="예스어스의 신념" key="1">
          <ul className="sidebar-submenu">
            <li><NavLink onClick={props.toggleSidebar} to="/shopinfo/brand">YES2020</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/wesave" className="dot">WE SAVE#농가</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/save_earth">WE SAVE#지구</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/partner">ESG 문의</NavLink></li>
          </ul>
        </Panel>
        <Panel header="예스어스 상품" key="2">
          <ul className="sidebar-submenu">
            <li><NavLink onClick={props.toggleSidebar} to="/usbox">어스박스 구독</NavLink></li>
            {/* <li><NavLink onClick={props.toggleSidebar} to="/product/1000029">99박스</NavLink></li> */}
            <li><NavLink onClick={props.toggleSidebar} to="/products/22">단품박스</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/review">구매후기</NavLink></li>
          </ul>
        </Panel>
        {isLogin ?
        <Panel header="예스어스 레시피" key="4">
          <ul className="sidebar-submenu">
            <li><NavLink onClick={props.toggleSidebar} to="/recipe/all">레시피 모두 보기</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/myshop/recipe">나만의 레시피</NavLink></li>
          </ul>
        </Panel>
        :<div className="ant-collapse-item"><NavLink onClick={props.toggleSidebar} to="/recipe/all" className="ant-collapse-header">예스어스 레시피</NavLink></div>}
        <Panel header="예스어스 소식" key="3">
          <ul className="sidebar-submenu">
            <li><NavLink onClick={props.toggleSidebar} to="/notice">공지사항</NavLink></li>
            {/* <li><NavLink onClick={props.toggleSidebar} to="/blog">블로그</NavLink></li> */}
            <li><NavLink onClick={props.toggleSidebar} to="/faq">자주 묻는 질문</NavLink></li>
            {isLogin && <li><NavLink onClick={props.toggleSidebar} to="/qna">1:1 문의</NavLink></li>}
            <li><NavLink onClick={props.toggleSidebar} to="/contact">Contact Us</NavLink></li>
          </ul>
        </Panel>
        <div className="ant-collapse-item"><a href="https://yes-us.co.kr/mukbti_v2/index.html#/" target="_blank" className="ant-collapse-header new" rel="noreferrer"><span className="alpha_muk"></span><small>NEW</small></a></div>
      </Collapse>
      <ul className="member">
        {isLogin ?
          <>
            <li><NavLink onClick={props.toggleSidebar} to="/logout" className="ant-collapse-header">로그아웃</NavLink></li>
          </>
          :
          <>
            <li><NavLink onClick={props.toggleSidebar} to="/login" className="ant-collapse-header">로그인</NavLink></li>
            <li><NavLink onClick={props.toggleSidebar} to="/member/join" className="ant-collapse-header">회원가입</NavLink></li>
          </>
        }
      </ul>
      <Link to="/article/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD/1/288/" alt="리뷰이벤트 자세히보기" className="side_banner"><img src="https://yes-us.co.kr/web/upload/yesus//popup/2112/side_2112_01.png" alt="리뷰이벤트 배너" /><span>~매월 말일 까지</span></Link>
    </aside>
  )
}
