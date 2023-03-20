import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeLoginUser } from '../../_actions/user_action';
import axios from 'axios';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.currentPrd);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const initKakaoLogin = async () => {
    const loadKakaoSdk = () => {
      return new Promise((resolve, reject) => {
        const js = document.createElement("script");
  
        js.id = "kakao-sdk";
        js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
        js.onload = resolve;
  
        document.body.append(js);
      });
    }
    await loadKakaoSdk();
    window.Kakao?.init(process.env.REACT_APP_KAKAO_APP_KEY);
  };

  const initNaverLogin = async () => {
    const loadNaverSdk = () => {
      return new Promise((resolve, reject) => {
        const js = document.createElement("script");
  
        js.id = "naver-sdk";
        js.src = "//static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        js.onload = resolve;
  
        document.body.append(js);
      });
    }
    const setNaverButton = async () => {
      const {naver} = window
      const naverLogin = await new naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_YES_US_SECRET_ID,
        callbackUrl: process.env.REACT_APP_NAVER_YES_US_REDIRECT_URL,
        isPopup: false,
        loginButton: {
          color: 'green',
          type: 3,
          height: 40,
        },
      });
      naverLogin.init();
    }
    await loadNaverSdk();
    await setNaverButton()
  };

  const initAppleLogin = async () => {
    const loadAppleSdk = () => {
      return new Promise((resolve, reject) => {
        const js = document.createElement("script");
  
        js.id = "apple-sdk";
        js.src = "//appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
        js.onload = resolve;
  
        document.body.append(js);
      });
    }
    await loadAppleSdk()
    await window.AppleID?.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_YESUS_CLIENT_KEY,
      scope: "name email",
      redirectURI: process.env.NEXT_PUBLIC_YES_US_REDIRECT_URL,
      nonce: process.env.NEXT_PUBLIC_APPLE_YESUS_NONCE,
      usePopup: true,
    });
  }

  const processAppleLogin = (data) => {
    console.log(data.detail);
    let authorization = data.detail.authorization;
    if (authorization.code) {
      const accessToken = authorization.code;

      requestSocialLogin(
        "APPLE",
        "YESUS",
        accessToken,
        authorization.user ? authorization.user : null
      );
    }
  }

  const processKakaoLogin = () => {
    
    window.kakao?.Auth.login({
      success: async function (auth) {
        if (auth.access_token) {
          const accessToken = auth.access_token;
          requestSocialLogin('KAKAO', 'YES_US', accessToken);
        }
      },
      fail: function (e) {
        // TODO: 로그인 실패 처리
      },
    });
  
  }

  const processNaverLogin = () => {
    window.location.href.includes('access_token') && signUp();

    async function signUp() {
      const location = window.location.href.split('=')[1];
      const accessToken = location.split('&')[0];

      requestSocialLogin('NAVER', 'YES_US', accessToken);
    }
  };

  const requestSocialLogin = async (provider, serviceType, token) => {
    await fetch(`${process.env.REACT_APP_AUTH_API_BASIC_PATH}/social-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        service_type: serviceType,
        token,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((response) => {
        loginSuccessHandler(response);
      });
  };

  useEffect(() => {
    initKakaoLogin();
    initNaverLogin();
    processNaverLogin();
    initAppleLogin()
    
    window.addEventListener("AppleIDSignInOnSuccess", processAppleLogin);
    return () => window.removeEventListener('AppleIDSignInOnSuccess',  processAppleLogin);
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(`${process.env.REACT_APP_AUTH_API_BASIC_PATH}/form-login`, {
        username,
        password,
      },{ 
        withCredentials: true 
      })
      if(request.message){
        alert(request.message)
      }else{
        loginSuccessHandler(request);
      }
    }catch(e) {
      alert('일시적인 네트워크 문제로 로그인 하지 못했습니다.\n다시 시도해주세요')
    }
  };

  const loginSuccessHandler = (response) => {
    const { access_token, username, nickname, code } = response;
    if (code === 'A105') {
      // TODO: A105 같은 에러 코드 중앙 관리?
      alert('임시처리: 비밀번호가 맞지 않습니다.');
      return;
    }

    dispatch(storeLoginUser(access_token, username, nickname));
    navigate('/', { replace: true });
  };

  return (
    <div id="contents" className="sign">
      <h2 className="titleArea">Login</h2>
      <form className="login" onSubmit={login}>
        <fieldset>
          <legend>회원로그인</legend>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* <Checkbox
            onChange={() => setLoginKeep(!loginKeep)}
            checked={loginKeep}
            className="auto"
          >
            로그인 상태 유지
          </Checkbox> */}
          {/* <span className="security">
            <img
              src="//img.echosting.cafe24.com/design/skin/default/member/ico_access.gif"
              alt="보안접속"
            />{' '}
            보안접속
          </span> */}
          <button type="submit" className="btnLogin">
            로그인
          </button>
          {products.length > 0 && (
            <Link to="/order/orderform" className="btnNormal">
              비회원 구매
            </Link>
          )}
          <ul className="find">
            <li>
              <Link to="/member/find_id">아이디찾기</Link>
            </li>
            <li>
              <Link to="/member/find_passwd_info">비밀번호찾기</Link>
            </li>
            <li>
              <Link to="/member/join">회원가입</Link>
            </li>
          </ul>
          <div className="snsArea">
            <div id="naverIdLogin" className="join naver"></div>
            <button
              className="join kakao"
              onClick={processKakaoLogin}
            >
              카카오 로그인
            </button>
            <button className="join ios">애플 로그인</button>
          </div>
        </fieldset>
        <Link to="/order/order_login" className="btnLogin">
          비회원 주문조회
        </Link>
      </form>
    </div>
  );
}
