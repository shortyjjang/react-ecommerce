import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import '../assets/import.css';
import PopBanner from '../components/PopBanner';
import { getBanner } from '../_actions/shop_actions';
import { getCartItems, storeLoginUser } from '../_actions/user_action';
import Footers from './Footers';
import Sidebar from './Sidebar';
import TopMenu from './TopMenu';
import ToTop from './ToTop';

export default function Layouts(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [fixHeader, setFixHeader] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [path, setPath] = useState('');


  const listener = useCallback(() => {
    let salesText = document.querySelector('.sales_text')
      ? document.querySelector('.sales_text').clientHeight
      : 0;
    if (window.pageYOffset > salesText) {
      setFixHeader('fixed');
      setShowTopBtn(true);
    } else {
      setFixHeader('');
      setShowTopBtn(false);
    }
    setPercentage(
      (window.pageYOffset /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100,
    );
  }, []);

  const toggleSidebar = (e) => {
    setCollapsed(!collapsed);
    if (collapsed) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = '';
    }
  };

  const closeSidebar = (e) => {
    setCollapsed(true);
    document.getElementsByTagName('body')[0].style.overflow = '';
  };
  const refreshToken = async () => {
    console.log('refreshing token..');
    await fetch(`${process.env.REACT_APP_AUTH_API_BASIC_PATH}/token-refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response)
        const { access_token, username, nickname, code } = response;
        if (code) {
          alert('임시처리: refresh 실패');
          return;
        }
        dispatch(storeLoginUser(access_token, username, nickname));
      });
  }
  const getCart = async () => {
    const request = user.authenticated ? await Api.get('',{username: user.username}).then(res => res.data.result) :JSON.parse(window.localStorage.getItem('yesusCart'))
    dispatch(getCartItems(request))
  }

  useEffect(() => {

    window.addEventListener('scroll', listener);
  }, []);
  useEffect(() => {
    if(user.authenticated) refreshToken()
    if(user.cart.length < 1) getCart()
  }, []);

  return (
    <>
      <TopMenu
        toggleSidebar={toggleSidebar}
        collapsed={collapsed}
        fixHeader={fixHeader}
        closeSidebar={closeSidebar}
      />
      <div className="container">
        {props.children}
        <Footers />
        <Sidebar
          collapsed={collapsed}
          fixHeader={fixHeader}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <ToTop showTopBtn={showTopBtn} percentage={percentage} />
      <PopBanner />
    </>
  );
}
