import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyData, getMyEarth } from '../_actions/user_action';

export default function MyPageHeader(props) {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [fixHeader, setFixHeader] = useState('');

  const flowtab = useCallback(() => {
    if (
      window.pageYOffset >
      document.querySelector('.userinfo:not(.mypage_tab)').offsetTop +
        document.querySelector('.userinfo:not(.mypage_tab)').clientHeight -
        document.querySelector('#header').clientHeight
    ) {
      setFixHeader('fixed');
    } else {
      setFixHeader('');
    }
  }, []);
  const changeNumber = (number) => {
    return new Intl.NumberFormat().format(parseInt(number));
  };
  useEffect(() => {
    dispatch(getMyData('g9test01'));
    dispatch(getMyEarth('g9test01'));
    // dispatch(getMyData(user.username));
    // dispatch(getMyEarth(user.username));
    // if (
    //   document.querySelector('.userinfo:not(.mypage_tab)') &&
    //   window.pageYOffset >
    //     document.querySelector('.userinfo:not(.mypage_tab)').offsetTop +
    //       document.querySelector('.userinfo:not(.mypage_tab)').clientHeight -
    //       document.querySelector('#header').clientHeight
    // ) {
    //   setFixHeader('fixed');
    // } else {
    //   setFixHeader('');
    // }
    // // 스크롤시 버튼및 탭메뉴 고정
    // if (document.querySelector('.userinfo:not(.mypage_tab)')) {
    //   window.addEventListener('scroll', flowtab);
    //   return () => window.removeEventListener('scroll', flowtab);
    // }
  }, []);
  return (
    <div className="userinfo">
      <div className="inner">
        <div className="user_who">
          <div className="mbti_div">
            {!!user.userInfo && user.userInfo.hasMbtiYn === 'Y' &&
            user.userInfo.customerMbti.surveyType === 'PERSONAL_CHECK' ? (
              <Link
                to={`/mukbti_v2/index.html#/result/${user.userInfo.customerMbti.pcId}`}
                title="결과확인하기"
                target="_blank"
              >
                <img
                  src={
                    user.userInfo.customerMbti
                      .mukTypeMobileThumbnailImagePath
                  }
                  alt=""
                />
              </Link>
            ) : (
              <Link
                to="/mukbti_v2/index"
                title="테스트 바로가기"
                target="_blank"
              >
                <span className="blank"></span>
                <span>먹비티아이 〉</span>
              </Link>
            )}
          </div>
          <div className="user_div">
            {!!user.userInfo && user.userInfo.hasMbtiYn === 'Y' &&
            user.userInfo.customerMbti.surveyType === 'PERSONAL_CHECK' ? (
              <span className="mbti_type">
                #{user.userInfo.customerMbti.mukType}형
              </span>
            ) : (
              <span className="mbti_type">나의 취향저격 채소꾸러미는?</span>
            )}
            <div className="name">
              {!!user.userInfo && user.userInfo.customerName ? (<strong>{user.userInfo.customerName}</strong>) : (<strong>회원님</strong>)}
              <Link to="/member/modify">내정보 바로가기</Link>
            </div>
            <p className="userinfo-hate">
              못먹는 채소
              {!!user.userInfo &&user.userInfo.hateVegetables ? (<strong className="add_info">{user.userInfo.hateVegetables}</strong>) : (<strong className="add_info">선택된 채소가 없어요!</strong>)}
            </p>
          </div>
        </div>
        <div className="userinfo-save ">
          <li>
            <Link to="/myshop/mileage">
              <label>적립금</label>
              <b>
                <span>85,400원</span>
              </b>
            </Link>
          </li>
          <li>
            <Link to="/myshop/coupon">
              <label>쿠폰</label>
              <b>
                <span>3</span>
              </b>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
