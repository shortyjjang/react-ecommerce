import React, { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Navigation, Mousewheel } from "swiper";
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function Subscription() {
  const isLogin = useSelector(state => state.user.authenticated);
  const navigate = useNavigate()
  const [cycle, setCycle] = useState('1')
  const [size, setSize] = useState('1')
  const [isSubscribe, setIsSubscribe] = useState(true)
  const goCheckout = () => {
    if(!isLogin) {
        confirm({
          title: '로그인 후 구매할 수 있습니다.',
          icon: <ExclamationCircleOutlined />,
          okText: '로그인 하기',
          cancelText: '취소',
          onOk() { navigate('/login') },
        });
        return;
    }
  }
  return (
    <Swiper className="usbox subscribe"
        direction={"vertical"}
        navigation={true}
        modules={[Navigation, Mousewheel]}
        mousewheel={true}
    >
        <SwiperSlide className="step1">
            <div className="step">
                <h2>
                    <small>STEP 1 <em>(생략 가능해요!)</em></small>
                    먹비티아이 테스트
                </h2>
                <div className="text">
                    <p>나에게 딱 맞는 어스박스를 추천받아요!<br />
                    취향저격 채소를 고르고 레시피까지 추천해줘요</p>
                    <p>먹비티아이 테스트하고 적립금도 받아가세요!</p>
                    <a href="https://m.yes-us.co.kr/mukbti_v2/index.html#/" rel="noreferrer" target="_blank" className="btnNormal btnSubmit">테스트하러 가기</a>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="step step2">
            <h2>
                <small>STEP 2</small>
                크기를 선택해주세요
            </h2>
            <p>매 주 나에게 맞는 6~10종의<br />다양한 채소/과일이 들어가요</p>
            <div className="text">
                <ul className="select_option select_size">
                    <li className="selected"><input type="radio" name="usbox_size" value='1' defaultChecked onClick={(e) => setSize(e.target.value)} /><label>
                        <span>온리원</span>
                        <small>1~2인 가구에게 적합해요</small>
                        <img src="https://yes-us.co.kr/web/upload/yesus/usbox_buy_img03.png" />
                        &nbsp;<b>회당 15,000원</b>
                    </label></li>
                    <li><input type="radio" name="usbox_size" value='2' onClick={(e) => setSize(e.target.value)} /><label>
                        <span>투게더</span>
                        <small>3~4인 가구에게 적합해요</small>
                        <img src="https://yes-us.co.kr/web/upload/yesus/usbox_buy_img03.png" />
                        &nbsp;<b>회당 25,000원</b>
                    </label></li>
                </ul>
                <div className="ta_r">* 배송비 3,000원 별도</div>
                <div className="discount">1회차~ 6회차 결제할 때마다 <strong className="fcg">500원 할인,</strong><br />
                7회차부터는 <strong className="fcg">1,000원 할인!</strong></div>
            </div>
        </SwiperSlide>
        <SwiperSlide className="step step3">
            <h2>
                <small>STEP 3</small>
                배송주기를<br /> 선택해주세요
            </h2>
            <p>배송주기는 마이페이지에서 언제든 바꿀 수 있어요</p>
            <ul className="select_option select_cycle">
                <li><input type="radio" name="usbox_cycle" value='1' defaultChecked onClick={(e) => setCycle(e.target.value)} /><label><span>1주마다</span></label></li>
                <li><input type="radio" name="usbox_cycle" value='2' onClick={(e) => setCycle(e.target.value)} /><label><span>2주마다</span></label></li>
                <li><input type="radio" name="usbox_cycle" value='3' onClick={(e) => setCycle(e.target.value)} /><label><span>3주마다</span></label></li>
            </ul>
            <button className="btnNormal btnSubmit" onClick={goCheckout}>다음</button> 
            <div className="only_once">
                <h3>정기구독이 망설여지시나요?</h3>
                <p>정기구독 전 1회 체험하기로 어스박스와 친해져보세요<br />
                마음에 들었다면 언제든 돌아와 신청할 수 있어요!</p>
                <ul className="select_option select_test">
                    <li><input type="checkbox" name="usbox_trial" onClick={(e) => setIsSubscribe(!e.target.checked)}/><label><span>1회 체험하기</span></label></li>
                </ul>
            </div>
        </SwiperSlide>
    </Swiper>
  )
}
