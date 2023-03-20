import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Api from '../../utils/customAPI';
import { changePriceFormat } from '../../_actions/product_action';

import { Pagination, Navigation } from "swiper";

function LikeHateVege (props) {
  const [vegeList, setVegeList] = useState()
  const [likeList, setLikeList] = useState()
  const [hateList, setHateList] = useState()
  const checkVege = () => {
    let data = {
        crpId : props.pick.crpId, 
        customerId : props.pick.customerId, 
        opId : props.pick.opId ? props.pick.opId : 0,
        detailList: vegeList, 
        orderId : props.pick.orderId ? props.pick.orderId : 0, 
        rpsId : props.pick.rpsId
    }
    const request = Api.post('api/v1/customer/updateCustomerPick',data)
    if(request.status === 200) {
      alert('저장되었습니다.');
    }else{
      alert(request.message)
    }
  }
  const checkLike = (crpiId, itemId) => {
    if(likeList.length > 4 && !likeList.find(it => it.itemId === itemId)) {
        alert('좋아요는 최대 5개까지 선택하실 수 있습니다.');
    }else{
      if(hateList.find(it => it.itemId === itemId)) setHateList(hateList.filter(it => it.itemId === itemId))
      if(!likeList.find(it => it.itemId === itemId)) {
        setLikeList([
          ...likeList,
          {
            crpiId: crpiId,
            crpiType: 'GOOD',
            itemId: itemId
          }
        ])
        setVegeList([
          ...vegeList,
          {
            crpiId: crpiId,
            crpiType: 'GOOD',
            itemId: itemId
          }
        ])
      }else{
        setLikeList(likeList.filter(it => it.itemId === itemId))
        setVegeList([
          ...vegeList,
          {
            crpiId: crpiId,
            crpiType: '',
            itemId: itemId
          }
        ])
      }
    }
  }
  const checkHate = (crpiId, itemId) => {
    if(hateList.length > 1 && !hateList.find(it => it.itemId === itemId)) {
        alert('싫어요는 최대 2개까지 선택하실 수 있습니다.');
    }else{
      if(likeList.find(it => it.itemId === itemId)) setLikeList(likeList.filter(it => it.itemId === itemId))
      if(!hateList.find(it => it.itemId === itemId)) {
        setHateList([
          ...hateList,
          { 
            crpiId: crpiId,
            crpiType: 'BAD',
            itemId: itemId
          }
        ])
        setVegeList([
          ...vegeList,
          {
            crpiId: crpiId,
            crpiType: 'BAD',
            itemId: itemId
          }
        ])
      }else{
        setHateList(hateList.filter(it => it.itemId === itemId))
        setVegeList([
          ...vegeList,
          {
            crpiId: crpiId,
            crpiType: '',
            itemId: itemId
          }
        ])
      }
    }
  }
  useEffect(() => {
    setVegeList(props.pick.items)
    setHateList(props.pick.items.filter(it => it.crpiType === 'BAD'))
    setLikeList(props.pick.items.filter(it => it.crpiType === 'GOOD'))
  },[])
  return(
    <>
    <h3>
      {props.pick.pickOrderStatus === 'ORDER' ? moment(props.pick.orderDeliveryPlanDate).format('M/D(dd)') : moment(props.pick.thisWeekDeliveryPlanDate).format('M/D(dd)')} 
      발송 {props.pick.isOrderYn === 'N' &&  props.pick.pickOrderStatus === 'SUBSCRIPTION_WILL_ORDER' ? '예정' : props.pick.isOrderFixedYn === 'Y' ? '확정' : ''} 품목
    </h3>
    {props.pick.pickOrderStatus === 'NOT_ORDER' ? <>
      <p><strong>아직 어스박스를 사용하지 않고 계시네요!</strong><br />
      어스박스 시작하고 아래 품목을 받아보세요</p>
      <a href="/usbox/subscribe.html?product_no=22" className="more go_usbox">어스박스 시작하기</a>
    </>
    : props.pick.pickOrderStatus === 'SUBSCRIPTION_NEXT' ? <>
      <p>{props.customerName}님의 배송일은 <strong>{moment(props.pick.subscriptionNextDeliveryPlanDate).format('M월 D일')}</strong> 입니다<br />
      배송 주기를 변경하고 아래 품목을 받아보세요</p>
      <a href="/myshop/regular_delivery_detail.html?invoice_no=${o.subscriptionId}" className="more">배송주기를 변경하기</a>
    </>
    : props.pick.isOrderFixedYn === 'Y' ?
      <p className="vege"><span>{props.pick.items.filter(it => it.isApplyOrderYn === 'Y').map(it => ` ${it.itemName}`)}</span></p>
    : <p className="vege">
        <span>{vegeList && vegeList.filter(it => it.isHateVegetableYn === 'N' && it.crpiType !== 'BAD').map(it => ` ${it.itemName}`)}</span>
        <small>* 위 품목 중 좋아하는 채소를 포함한 8~10종이 발송됩니다.</small>
      </p>
    }
    <div className="good_bad_label"><span>좋아요</span><span>싫어요</span></div>
    <ul className={props.pick.isOrderFixedYn === 'Y' ? 'disabled': ''}>
      {props.pick.isOrderFixedYn === 'Y' && <strong className="order_fixed">주문확정<br /> 금요일에 만나요 :)</strong>}
      {props.pick.items.map(it => 
        <li className={it.isHateVegetableYn === 'Y' ? 'disabled' : ''} key={it.itemId}>
          <label className="vege_name">{it.itemName}</label>
          <button className={`btn_like ${likeList && likeList.find(like => like.itemId === it.itemId) && 'on'}`} onClick={() => checkLike(it.crpiId, it.itemId)}><span className="displaynone">좋아요</span></button>
          <button className={`btn_hate ${hateList && hateList.find(like => like.itemId === it.itemId) && 'on'}`} onClick={() => checkHate(it.crpiId, it.itemId)}><span className="displaynone">싫어요</span></button>
        </li>
      )}
    </ul>
    <div className="skiptip">
        <a href="/member/modify.html#birth_year">못 먹는 채소 변경하기</a><br />
        * 좋아요는 5개, 싫어요는 2개까지 선택할 수 있어요<br />
        ** 매 주 수요일 오전 9시까지 수정할 수 있어요
    </div>
    {props.pick.isOrderFixedYn === 'N' && <button className="btnNormal" onClick={checkVege}>확인</button>}
    </>
  )
}

export default function MyHome(props) {
  let user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState(null)
  const [userSave, setUserSave] = useState(null)
  const getMyEarth = async (id) => {
    let body = {
      params: {
        mallCd: 'CAFE24',
        mallCustomerId: id,
      },
    };
    const request = await Api.get('/saveEarth/mypage/getCurrMonthCustomerSaveEarth', body);
    setUserSave(request.data.result)
  }
  const getMyData = async (id) => {
    let body = {
      params: {
        mallCd: 'CAFE24',
        mallCustomerId: id,
      },
    };
    const request = await Api.get('/customer/getMypageData', body);
    setUserInfo(request.data.result)
  }
  useEffect(() => {
    if(user.username && !userInfo) getMyData(user.username)
    if(user.username && !userSave) dispatch(getMyEarth(user.username))
  },[])
  return (
    <>
      <div className="userinfo">
        <div className="inner">
          <div className="user_who">
            <div className="mbti_div">
              {!!userInfo && userInfo.hasMbtiYn === 'Y' &&
              userInfo.customerMbti.surveyType === 'PERSONAL_CHECK' ? (
                <Link
                  to={`/mukbti_v2/index.html#/result/${userInfo.customerMbti.pcId}`}
                  title="결과확인하기"
                  target="_blank"
                >
                  <img
                    src={
                      userInfo.customerMbti
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
              {!!userInfo && userInfo.hasMbtiYn === 'Y' &&
              userInfo.customerMbti.surveyType === 'PERSONAL_CHECK' ? (
                <span className="mbti_type">
                  #{userInfo.customerMbti.mukType}형
                </span>
              ) : (
                <span className="mbti_type">나의 취향저격 채소꾸러미는?</span>
              )}
              <div className="name">
                {!!userInfo && userInfo.customerName ? (<strong>{userInfo.customerName}</strong>) : (<strong>회원님</strong>)}
                <Link to="/member/modify">내정보 바로가기</Link>
              </div>
              <p className="userinfo-hate">
                못먹는 채소
                {!!userInfo &&userInfo.hateVegetables ? (<strong className="add_info">{userInfo.hateVegetables}</strong>) : (<strong className="add_info">선택된 채소가 없어요!</strong>)}
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
      <div id="contents">
        <div className="inner myhome">
          <div className="myhome_usbox">
            <h3>나의 어스박스</h3>
            {userInfo && userInfo.customerPickList ?
              <Swiper
                // navigation={true}
                pagination={true}
                modules={[
                  // Navigation, 
                  Pagination
                ]}
              >
                {userInfo.customerPickList.map((pick, index) => <SwiperSlide className="good_bad_vage" key={index}>
                  <LikeHateVege pick={pick} customerName={userInfo.customerName} />
                </SwiperSlide>)}
              </Swiper>
              :
              <div className="good_bad_vage">
                  <h3>{moment().format('M/D(dd)')} 발송 확정 품목</h3>
                  <p><strong>아직 어스박스를 사용하지 않고 계시네요!</strong><br />
                  어스박스 시작하고 아래 품목을 받아보세요</p>
                  <Link to="/usbox/subscribe.html?product_no=22" className="more go_usbox">어스박스 시작하기</Link>
                  <div className="good_bad_label"><span>좋아요</span><span>싫어요</span></div>
                  <ul>
                    <li className="order_fixed">품목을 불러오고 있습니다</li>
                    <li><label className="vege_name">감자</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">고구마</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">당근</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">무</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">양배추</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">양상추</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li className="disabled"><label className="vege_name">양파</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">오이</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">청경채</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li><li><label className="vege_name">팽이버섯</label><button className="btn_like undefined"><span className="displaynone">좋아요</span></button><button className="btn_hate undefined"><span className="displaynone">싫어요</span></button></li>
                  </ul>
                  <div className="skiptip">
                      <a href="/member/modify.html#birth_year">못 먹는 채소 변경하기</a><br />
                      * 좋아요는 5개, 싫어요는 2개까지 선택할 수 있어요<br />
                      ** 매 주 수요일 오전 9시까지 수정할 수 있어요
                  </div>
              </div>
            }
            {userInfo && userInfo.customerPickList.find(pick => pick.pickOrderStatus !== 'NOT_ORDER') && <a href="/myshop/regular_delivery.html" className="link_subscribe">정기구독 관리</a>}
          </div>
          <div className="myhome_sec">
            <h3>나의쇼핑</h3>
            <ul>
              <li className="order"><Link to="/myshop/order/list.html">주문 및 배송 조회</Link></li>
              <li className="wishlist"><Link to="/myshop/wish_list.html">나의 관심상품</Link></li>
              <li className="coupon"><Link to="/myshop/coupon/coupon.html">쿠폰등록/조회</Link></li>
              <li className="address"><Link to="/myshop/addr/list.html">배송 주소록 관리</Link></li>
            </ul>
          </div>
          <div className="myhome_sec">
            <h3>고객센터</h3>
            <ul>
              <li className="order"><Link to="/myshop/order/list.html">FAQ</Link></li>
              <li className="wishlist"><Link to="/myshop/wish_list.html">1:1문의</Link></li>
            </ul>
          </div>
          {userSave &&
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="myhome_save"
            >
              <SwiperSlide className="money">
                <strong>이번 달에는 <span className="fcg earthBoxSavePrice">{changePriceFormat(userSave.earthBoxSavePrice)}원</span>의<br/>채솟값을 절약했어요!</strong>
                <Link to="/wesave/save.html#save">We Save #장보기 〉</Link>
              </SwiperSlide>
              <SwiperSlide className="gas">
                <strong>지금까지 <span className="fcg kgCO2eq">{changePriceFormat(userSave.kgCO2eq)}kgCO2eq</span>의<br/>온실가스를 절감했어요!</strong>
                <Link to="/wesave/save.html">We Save #지구 〉</Link>
              </SwiperSlide>
            </Swiper>
          }
        </div>
      </div>
    </>
  )
}
