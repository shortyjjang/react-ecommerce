import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TopMenu(props) {
  const isLogin = useSelector((state) => state.user.authenticated);
  const cart = useSelector((state) => state.user.cart);
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    //카트에 담긴 것이 있는 경우
    if (cart && cart.length > 0) {
      let count = 0;
      cart.map((item) => {
        count += Number(item.quantity);
      });
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [cart]);

  return (
    <>
      <div id="header" className={props.fixHeader}>
        <div className="navigation">
          <span
            onClick={props.toggleSidebar}
            className={props.collapsed ? 'btn_menu' : 'btn_menu open'}
          >
            <span></span>
          </span>
          <Link className="logo" onClick={props.closeSidebar} to="/">
            <span className="displaynone">YES-US</span>
          </Link>
          <ul>
            <li>
              <NavLink onClick={props.closeSidebar} to="/shopinfo/brand">
                YES2020
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={props.closeSidebar}
                to="/wesave"
                className="dot"
              >
                <span>
                  WE SAVE<span className="pc">#농가</span>
                </span>
              </NavLink>
              <small>
                <NavLink onClick={props.closeSidebar} to="/wesave">
                  WE SAVE #농가
                </NavLink>
                <NavLink onClick={props.closeSidebar} to="/save_earth">
                  WE SAVE #지구
                </NavLink>
              </small>
            </li>
            <li>
              <NavLink onClick={props.closeSidebar} to="/usbox">
                상품
              </NavLink>
              <small>
                <NavLink onClick={props.closeSidebar} to="/usbox">어스박스 구독</NavLink>
                {/* <NavLink onClick={props.closeSidebar} to="/product/1000029">99박스</NavLink> */}
                <NavLink onClick={props.closeSidebar} to="/products/22">단품</NavLink>
              </small>
            </li>
            <li>
              <NavLink onClick={props.closeSidebar} to="/recipe/all">예스어스 레시피</NavLink>
              {isLogin && <small>
                <NavLink onClick={props.toggleSidebar} to="/recipe/all">레시피 모두 보기</NavLink>
                <NavLink onClick={props.toggleSidebar} to="/myshop/recipe">나만의 레시피</NavLink>
              </small>}
            </li>
            <li>
              <a
                href="https://yes-us.co.kr/mukbti_v2/index.html#/"
                target="_blank"
                className="new"
                rel="noreferrer"
              >
                <span className="alpha_muk"></span>
                <small>NEW</small>
              </a>
            </li>
          </ul>
        </div>
        <ul className="member">
            <li className="esg">
              <NavLink onClick={props.closeSidebar} to="/partner">
                ESG 문의
              </NavLink>
            </li>
          {!isLogin ? (
            <li className="login">
              <NavLink onClick={props.closeSidebar} to="/login">
                로그인
              </NavLink>
            </li>
          ) : (
            <li className="account">
              <NavLink onClick={props.closeSidebar} to="/myshop">
                마이페이지
              </NavLink>
            </li>
          )}
          <li className="cart">
            <NavLink onClick={props.closeSidebar} to="/order/basket">
              장바구니<span>{cartCount}</span>
            </NavLink>
          </li>
          {isLogin && (
            <li className="logout">
              <NavLink onClick={props.closeSidebar} to="/logout">
                로그아웃
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
