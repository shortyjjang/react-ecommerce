import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper";
import { Modal } from 'antd';
import Api from '../../utils/customAPI';
import { Link } from 'react-router-dom';

const { info, error } = Modal;

export default function GuGuBox() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState({
    cell1:'010',
    cell2:null,
    cell3:null,
    name:null,
  });
  const [agreement, setAgreement] = useState({
    type1:false,
    type2:false,
  });
  const onChange = (e) => {
    const [value, name] = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const onCheck = (e) => {
    const [name, checked] = e.target;
    setAgreement({
      ...values,
      [name]: checked
    })
  }
  const handleOk = () => {
    const phoneNumber = values.cell1 + values.cell2 + values.cell3;
    if(!values.name || !values.cell2 || !values.cell3) error({title: '모든 항목을 입력 해주십시오'})
    else if (phoneNumber.length < 11 || isNaN(phoneNumber)) error({title: '정확한 핸드폰번호를 입력해주십시오'})
    else if(!agreement.type1 || !agreement.type2) error({title: '모든 약관에 동의해주십시오'})
    else {
        const request = Api(`v1/earth/event/apply`, {"agreeYn": "Y","applicantName": document.getElementById('booker').value,"applicantTelNum": phoneNumber,"eventId": 1,"eventTypeCd": "EV01"});
        if (request.title === 'OK' || request.title == 'FAILED') alert(request.message);
        if (request.title === 'OK') {
          setModalVisible(false)
          setValues({
            cell1:'010',
            cell2:null,
            cell3:null,
            name:null,
          });
          setAgreement({
            type1:false,
            type2:false,
          });
        }
    }
  }
  useEffect(() => {
    document.querySelector('body').setAttribute('current-pos','0')
  },[])
  return (
    <>
      <Swiper className="ad_99 swiper-v"
        direction={"vertical"}
        slidesPerView={1}
        navigation={true}
        mousewheel={window.innerHeight < 600 ? false : true}
        pagination={{
          type: "fraction",
        }}
        onSlideChange={(swiper) => document.querySelector('body').setAttribute('current-pos',swiper.realIndex)}
        modules={[Pagination, Navigation, Mousewheel]}
      >
        <SwiperSlide className="paging1">
          <div className="inner">
            <span className="thumbnail"></span>
            <div className="right">
              <h2><small>9,900원으로 만나는 한주 채소/과일</small><br/><b>99박스<br/>사전 예약</b></h2>
              <p>판로가 없어 미아가 된 못난이 농산물<br/>
              5~6종이 랜덤으로 배송됩니다<br/><b>가성비 좋은 스마트한 소비,</b><br/><b>주변에도 널리 알려주세요</b></p>
              <button className="btnNormal" onClick={() => setModalVisible(true)}>사전 예약하기</button>
              <small>* 어스박스 친환경 농산물과 다른 일반 농산물입니다</small>
              <small>** 주 1회 발송되며 구성 품목은 사전 공개되지 않습니다</small>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="paging2">
          <div className="inner">
            <div className="left">
              <h2><b>사전 예약 EVENT</b></h2>
              <h3>참여 방법</h3>
              <ol>
                <li>1. 예스어스 로그인 후 ‘사전 예약’ 클릭하면 참여 완료</li>
                <li>2. 출시 2일 전, 출시 당일 알림톡 받고 선착순 구매하기</li>
              </ol>
              <p><b>사전 예약만 해도 적립금 1,500원 증정!</b><br/>* 99박스 구매 시 사용 가능</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="paging3">
          <Swiper className="inner swiper-h"
            slidesPerView={1}
            grabCursor={true}
            direction={"horizontal"}
            breakpoints={{
              720: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide className="left">
              <div className="wh_box">
                <h2><b>99박스</b></h2>
                <ul><li className="price">9,900원</li>
                  <li>친환경 X (일반 농산물)</li>
                  <li>개인화 X (랜덤박스)</li>
                  <li>정기구독 X</li>
                </ul><p>
                  <small className="fcg">※ 회원가입 시 설정한 못 먹는 채소는 발송되지 않습니다</small><br/><b className="fcg">99박스는 가격에 특화된 상품입니다</b><br/>
                  친환경 농산물을 선호하시거나<br/>
                  개인화/정기구독 서비스가 필요하신 분은<br/>
                  어스박스를 선택해주세요
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="right">
            <div className="wh_box">
              <h2><b>어스박스</b></h2>
              <ul><li className="price">15,000원~</li>
                <li>친환경 O (유기농/무농약)</li>
                <li>개인화 O (AI 추천 레시피/농산물)</li>
                <li>정기구독 O</li>
              </ul><Link to="/product/surl/22" className="btnNormal" target="_blank">어스박스 바로가기</Link>
            </div>
            </SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide className="paging4">
          <div className="inner">
            <div className="left">
              <h2><b><span className="fcg">9,900원</span>으로<br/>
              만나는 한주 채소/과일</b></h2>
              <p><b>5~6종의 채소/과일을 9,900원에 만나는 경험,<br/>흔치 않을 거예요</b></p>
              <p>99박스로 극한의 가성비를 누려보세요</p>
            </div>
            <div className="right">
              <h3>99박스 구성 예시</h3>
              <table><thead><tr><th>품목</th><th>수량</th><th className="price">가격</th><th>온라인 마켓<br/> 가격</th></tr></thead><tbody><tr><td>대파</td><td>2~3대</td><td rowSpan="7" className="price"><b>9,900원</b></td><td rowSpan="7">약 13,000원</td></tr><tr><td>양파</td><td>4~5개</td></tr><tr><td>파프리카</td><td>1~2개</td></tr><tr><td>가지</td><td>2~3개</td></tr><tr><td>청상추</td><td>한움큼</td></tr><tr><td>미나리</td><td>한움큼</td></tr><tr><td>Total</td><td>2~3kg</td></tr></tbody></table>
              <button className="btnNormal" onClick={() => setModalVisible(true)}>사전예약</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="paging5">
          <div className="inner">
            <h2><b><span className="fcg">예쁜 못난이?</span></b></h2>
            <p>수확량이 많아지면 가격이 내려갑니다<br/>
            가격 방어를 위해 멀쩡하게 생긴 농산물들도<br/>
            판로를 잃고 버려집니다</p>
            <p><b>99박스에는 이런 예쁜 못난이들이<br/>다수 포함됩니다</b></p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="paging6"><span></span>
          <div className="inner">
            <h2><b><span className="fcg">두근두근 쪼는 맛</span></b></h2>
            <h2></h2>
            <p>발송 당일 미아가 된 친구들을 데려오기 때문에<br/>품목을 미리 알려드릴 수는 없어요</p>
            <p>하지만 매주 선물을 받는 듯 설레는 언박싱,</p>
            <p>오히려 좋지 않나요?</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="paging7">
          <div className="inner">
            <h2><b><span className="fcg">For Earth, By Us.</span></b></h2>
            <p>많은 것이 달라질 겁니다. 장보기가 바뀐다면</p>
            <p>우리가 사는 행성은 조금 더 쾌적해질 것이고<br/>
            우리가 사는 사회는 조금 더 풍족해질 것이며<br/>
            우리가 사는 방식은 조금 더 편리해질 것입니다</p>
            <p><b>지구를 살리는 장보기의 시작, 예스어스</b></p>
            <button className="btnNormal" onClick={() => setModalVisible(true)}>사전 예약하기</button>
          </div>
        </SwiperSlide>
      </Swiper>
      <Modal title="사전 예약하기" 
        visible={isModalVisible} 
        onOk={handleOk} 
        okText="예약하기"
        cancelText="취소"
      >
        <div><input placeholder="이름" type="text" value={values.name} onChange={onChange} name="name" /></div>
        <div className="flex">
          <select value={values.cell1} onChange={onChange} name="cell1">
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
          <span>-</span>
          <input maxLength="4" minLength="4" className="inputTypeText" value={values.cell2} type="text" onChange={onChange} name="cell2" />
          <span>-</span>
          <input maxLength="4" minLength="4" className="inputTypeText" value={values.cell3} type="text" onChange={onChange} name="cell3"/>
        </div>
        <ul>
          <li><label for="bookagree1"><input type="checkbox" checked={agreement.type1} onChange={onCheck} name="type1" /> 개인정보수집 이용동의(필수)</label> <button className="more" onClick={() => info({
            title: '개인정보수집 이용동의',
            icon: <ExclamationCircleOutlined />,
            content: <div className="agreement">99박스 출시 알림, 홍보 등을 위한 개인정보 수집·이용 및 제공 동의서

예스어스는 원활한 상담 및 안내를 위해 귀하의 개인정보를 수집∙이용 및 제공합니다.
※ 서비스 이용을 위한 개인정보 입력 및 본 동의서에 대한 동의는 본인이 직접 진행해 주셔야 합니다.
다음의 내용을 충분히 검토하신 후 동의 여부를 결정해 주시기 바랍니다.
[개인정보 수집·이용 내역]
- 수집/이용 항목: 이름, 연락처(휴대폰)
- 수집/이용 목적: 제품 출시 안내, 제품 및 서비스 상담, 제품 및 서비스 홍보 및 이벤트 안내
- 개인정보 보유 및 이용 기간: 제품 출시 안내 후 이력 관리를 위해 6개월간 보관 후 파기

※ 위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 원활한 상담 및 서비스 제공에 제한을 받을 수 있습니다.</div>,
          })}>자세히보기</button></li>
          <li><label for="bookagree2"><input type="checkbox" checked={agreement.type2} onChange={onCheck} name="type2" /> 개인정보 제3자 제공에 동의(필수)</label> <button className="more" onClick={() => info({
            title: '개인정보 제3자 제공에 동의',
            icon: <ExclamationCircleOutlined />,
            content: <div className="agreement">개인정보 제3자 제공 내역

- 제공받는 자: 예스어스
- 제공 목적: 제품 출시 안내, 제품 및 서비스 상담, 제품 및 서비스 홍보 및 이벤트 안내
- 제공 항목: 이름, 연락처(휴대폰)
- 보유 및 이용 기간: 제품 출시 안내 후 이력 관리를 위해 6개월간 보관 후 파기

※ 위의 개인정보 제공에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 원활한 서비스 안내 제공에 제한을 받을 수 있습니다.</div>,
          })}>자세히보기</button></li>
        </ul>
      </Modal>
    </>
  )
}
