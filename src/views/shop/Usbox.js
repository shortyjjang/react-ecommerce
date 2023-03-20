import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Link} from 'react-router-dom';
import '../../assets/css/usbox.min.css'
function Review(props) {
    return (
        <div className="text_review">
            {props.thumbnail && <span className="img"><img src={props.thumbnail} /></span>}
            {props.title && <h3>{props.title}</h3>}
            <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
            <strong>- {props.customer ? `${props.customer} 고객님` : '예스어스'} -</strong>
        </div>
    )
}

export default function Usbox() {
    const [currentY, setCurrentY] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll', () => {setCurrentY(window.pageYOffset)});
    },[])
  return (
    <div className="usbox_landing">
        <section className="main_promotion"></section>
        <div className="section usbox_sec1">
            <div className="inner">
                <div className="text">
                    <h1>
                        못난이? 맛난이!<br />
                        <span className="fcg">친환경 못난이</span><br />
                        농산물 꾸러미
                    </h1>
                    <p><strong>다양하게, 먹을 만큼</strong> 알아서 보내드려요!</p>
                    <p><strong>최대 59% 저렴하게</strong> 지구를 살리는 장보기 <strong>지금 시작하세요</strong></p>
                </div>
                <Link to={'/usbox/subscribe'} className="btnNormal btnSubmit">어스박스 시작하기</Link>
            </div>
        </div>
        <div className="section usbox_sec2">
            <div className="inner">
                <h2>못난이 채소는 대량 구매만?<br />
                6~10종의 다양한<br />
                농산물을 보내드려요 <small>이번 주엔 어떤 채소가 올까?<br /><a href="/myshop">미리 확인하기</a></small></h2>
                <div className="thumbnail"></div>
                <Review customer="장*진" content={`“장 보는 시간도 줄었지만 제가 직접<br />장 볼 때보다 다양하게 채소가 늘 구비되어<br />있어서 너무 좋습니다”`} />
            </div>
        </div>
        <div className="section usbox_sec3">
            <div className="inner">
            <h2>친환경 농산물은 비싸다? <span className="fcg">NO!</span><br />
            시세 대비<br />
            최대 59% 절약해요</h2>
            <div className="this_week">
                <h3>이 주의 어스박스(22/06/16 발송분) <small>무농약 이상 기준</small></h3>
                <table>
                    <thead><tr><th>품목</th>
                            <th>시세</th>
                            <th>예스어스</th>
                            <th>절약</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th>가지</th><td>10,968</td><td rowSpan="10"><strong>25,000원</strong><br /> (투게더 박스)</td><td rowSpan="10" className="fcg"><strong>59%</strong><br /> 37,360원</td>
                        </tr><tr><th>감자</th><td>5,311</td>
                        </tr><tr><th>방울토마토</th><td>4,044</td>
                        </tr><tr><th>브로콜리</th><td>4,836</td>
                        </tr><tr><th>새송이</th><td>4,150</td>
                        </tr><tr><th>애호박</th><td>8,476</td>
                        </tr><tr><th>오이</th><td>5,037</td>
                        </tr><tr><th>초당옥수수</th><td>13,611</td>
                        </tr><tr><th>표고</th><td>5,925</td>
                        </tr><tr><td>합계</td><td>62,360</td>
                        </tr>
                    </tbody>
                </table>
                <small className="ex">시세참고 : KAMIS 친환경농산물 유통정보<br />어스박스는 개인화서비스로 품목의 구성과 중량은 개인별로 상이할 수 있습니다</small>
            </div>
            <Review customer="장*진" content={`“친구에게도 한 상자 주문해줬네요.<br />넘 좋은 가격에 &nbsp;잘 구매했어요”`} />
            </div>
        </div>
        <div className="benefit_discount">
            <h3>✨ 정기구독 할인 혜택✨</h3>
            <p>1~6회차 결제 할 때마다 <strong className="fcg">500원 할인!</strong><br />7회차부터는 <strong className="fcg">1,000원 할인!</strong></p>
        </div>
        <div className="section usbox_sec4">
            <div className="inner">
            <h2>다 똑같은 랜덤박스? <span className="fcg">NO!</span><br />
            AI가 내 취향을 반영해서<br />
            구성해요</h2>
            <div className="thumbnail">
            </div>
            <Review customer="이*경" content={`“딱! 필요한 채소들로<br />세 식구 먹기 좋은 양이 정기적으로 배송되는<br />못난이 채소친구들!!”`} />
            </div>
        </div>
        <div className="section usbox_sec5">
            <div className="inner">
            <h2>바른 장보기? <span className="fcg">YES!</span><br />
            농산물 산지폐기를 줄여<br />
            지구를 구해요</h2>
            <div className="thumbnail">
            <Review content={`“매년 버려지는 농산물이<br />5조원에 달한대요<br />맛이나 영양은 그대로인데 말이죠”`} />
            </div>
            </div>
        </div>
        <div className="benefit_goods">
            <h3>✨ 첫 구매 시 시크릿 굿즈 증정!</h3>
        </div>
        <div className="section usbox_sec6">
            <div className="inner">
            <h2>어스박스를 구독중인 분들의<br />
            후기로 미리 경험해보세요</h2>
            <Swiper
                spaceBetween={30}
                initialSlide={1}
            >
                <SwiperSlide>
                    <Review 
                        thumbnail="https://yes-us.co.kr/web/upload/yesus/usbox_landing_review1.png"
                        title="야채박스가 기다려져요"
                        content={`박스가 도착하면 열어보는 재미가 있네요<br />
                        야채를 기다려본 건 처음이에요<br />
                        못난이? 작다고 팔지 못한다지만 맛도 좋고<br />
                        친환경이라 믿고 먹었어요…`}
                        customer="이*선"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Review 
                        thumbnail="https://yes-us.co.kr/web/upload/yesus/usbox_landing_review3.png"
                        title="일요일 아침밥상"
                        content={`보내주신 어스박스<br />
                        상추에 마늘에 양파굽굽!<br />
                        바로 삼겹살과 함께, 일요일 아침상<br />
                        든든하게 잘 먹었습니다`}
                        customer="이*경"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Review 
                        thumbnail="https://yes-us.co.kr/web/upload/yesus/usbox_landing_review2.png"
                        title="예스어스 기대이상이예요!"
                        content={`한 달동안 두 번의 예스어스<br />
                        박스를 받았어요 기대이상입니다<br />
                        고민하는 시간도 줄어들고<br />
                        가공식품과 육류 섭취량도 줄었어요…`}
                        customer="류*주"
                    />
                </SwiperSlide>
            </Swiper>
            </div>
        </div>
        <div className="for_earth">
            <div className="inner">
            <h3>For Earth, By Us. </h3>
            <div className="text">
                <p>많은 것이 달라질 겁니다. 장보기가 바뀐다면</p>
                <p>우리가 사는 행성은 조금 더 쾌적해질 것이고<br />
                우리가 사는 사회는 조금 더 풍족해질 것이며<br />
                우리가 사는 방식은 조금 더 편리해질 것입니다</p>
                <p>지구를 살리는 장보기의 시작, 예스어스</p>
            </div>
            </div>
        </div>
        {document.querySelector('.usbox_sec1') && currentY > document.querySelector('.usbox_sec1').clientHeight &&<div className="fixed">
            <Link to={'/usbox/subscribe'} className="btnNormal btnSubmit">어스박스 시작하기</Link>
        </div>}
    </div>
  )
}
