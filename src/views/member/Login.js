import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { storeLoginUser } from '../../_actions/user_action';

export default function Login(props) {
  const { Kakao, naver } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.currentPrd);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const initKakaoLogin = () => {
    const kakaoAppKey = process.env.REACT_APP_KAKAO_APP_KEY;
    if (!Kakao.isInitialized()) {
      Kakao.init(kakaoAppKey);
    }
  };

  const initNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
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
  };

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
  }, []);

  const login = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_AUTH_API_BASIC_PATH}/form-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
    })
      .then((result) => result.json())
      .then((response) => {
        if(response.message) {
          alert(response.message)
        }else{
          loginSuccessHandler(response);
        }
      });
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
              onClick={() => {
                Kakao.Auth.login({
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
              }}
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
