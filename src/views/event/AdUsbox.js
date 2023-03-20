import React, { useEffect, useState, useCallback } from 'react'

export default function AdUsbox(props) {
  const [fixedBtn, setFixedBtn] = useState('fixed')
  const flowBtn = useCallback(() => {
    // 스크롤시 버튼및 탭메뉴 고정
    if (document.getElementById('footer') && window.pageYOffset < document.getElementById('footer').offsetTop - window.innerHeight) {
        setFixedBtn('fixed')
    } else {
        setFixedBtn('')
    }
  }, [])
  useEffect(() => {

    // 스크롤시 버튼및 버튼 고정
    window.addEventListener('scroll', flowBtn);
  },[])
  return (
    <div id="contents" className="usbox">
        <div className="usbox-header">
            <span className="date">No. 2022</span>
            <p>로켓, 샛별보다 중요한 건 <b>우리가 사는 지구입니다</b></p>
            <b className="from">예스어스</b>
        </div>
        <div className="usbox-title">
            <h1>지구를 살리는 장보기의 시작<br /><b>예스어스</b></h1>
            <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img01.png" />
        </div>
        <div className="usbox-suggest">
            <h2><b>어스박스는 지구와 우리, 모두에게</b> 이로운 장보기를 제안합니다</h2>
            <ul>
                <li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img02.png" />
                    <p>크기, 모양, 흠집, 수확량 등 갖가지 이유로<br />  버려지는 농산물을 구합니다<br /><strong className="bgy">지구를 살리고, 농가를 살리는 장보기죠</strong></p>
                </li>
                <li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img03.png" />
                    <p>친환경 농산물은 비싸지만 못난이라면 얘기가 달라지죠<br /><strong>어스박스를 구독하시면</strong> <strong className="bgy">일반 농산물 가격으로<br />
                    친환경 채소를 드실 수 있습니다</strong></p>
                </li>
                <li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img04.png" />
                    <p>6~10종의 다양한 농산물을 원하는 만큼 배송 받으세요<br /><strong>AI가 내 취향을 분석해</strong> <strong className="bgy">채소를 골라주고,</strong> <br /><strong>레시피까지 추천해</strong> <strong className="bgy">장보기 걱정을 덜어주죠</strong></p>
                </li>
            </ul>
        </div>
        <div className="usbox-experience">
            <h2><b>어스박스와 함께 달라지는</b> 긍정적인 변화를 직접 경험하세요</h2>
            <ul><li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img05.png" />
                    <div className="textArea"><h3>가치소비의 시작</h3>
                    먹는 것의 변화는 삶의 질을 바꿉니다<br /><strong>더 건강하고, 더 맛있게<br /> 장보기 지출은 오히려 줄었는데 말이죠</strong></div>
                </li>
                <li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img06.png" />
                    <div className="textArea"><h3>요리하는 삶</h3>
                    <span>신선한 채소들을 제때 먹기<br /> 위해 부지런해지며, <br />
                    AI가 추천해주는 레시피를<br /> 따라 요리합니다<br /><strong>우리 가족은 건강해지고 <br />
                    내 요리 실력은 날로 늘어나죠</strong></span></div>
                </li>
                <li>
                    <img src="https://yes-us.co.kr/web/upload/yesus/ad_usbox-img07.png" />
                    <div className="textArea"><h3>선한 영향력</h3>
                    <span>환경오염 자원 낭비<br /> 너무 멀게 느껴지시나요? <br />
                    가까운 우리 이웃의 이야기는 어떨까요? <strong>못난이 농산물은 농가 소득에 큰 보탬이 됩니다</strong></span></div>
                </li>
            </ul>
        </div>
        <a href="https://yes-us.co.kr/product/surl/22" className={`btnNormal bgy usbox-flow ${fixedBtn}`}>정기구독 시작하기</a>
        <div className="usbox-byus">
            <h2>For Earth, By Us.</h2>
            <p>많은 것이 달라질 겁니다. 장보기가 바뀐다면</p>
            <p>우리가 사는 행성은 조금 더 쾌적해질 것이고<br />
            우리가 사는 사회는 조금 더 풍족해질 것이며<br />
            우리가 사는 방식은 조금 더 편리해질 것입니다</p>
            <p>지구를 살리는 장보기의 시작, 예스어스</p>
            <a href="https://yes-us.co.kr/product/surl/22" className="btnNormal bgy">정기구독 시작하기</a>
        </div>
    </div>
  )
}
