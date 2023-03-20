import React from 'react'
import BoardWrite from '../../components/board/BoardWrite'
import BoardList from '../../components/board/BoardList'

export default function Esg() {
  return (
    <div className="partner">

        <div className="partner-cover">
            <p>ESG 캠페인, 아무리 고민해봐도<br />답이 나오지 않는다면?</p>
            <h2>“가치 있는” ESG 캠페인을 <br />예스어스에서<br />쉽고 빠르게 진행해보세요!</h2>
            <button className="btnSubmit">지금 문의하기</button>
        </div>
        <div className="partner-sec1">
            <div className="partner-inner">
                <div className="text">
                    <h3>
                        <small>Point 1</small>
                        못난이 농산물 구출로<br />
                        K-SDGs 달성에<br />
                        기여할 수 있어요
                    </h3>
                    <p>못난이 농산물로 어떤 가치를 실현할 수 있나요?</p>
                    <p>K-SDGs 목표 2.<br /><span className="bcy">식량안보 및 지속가능한 농업 강화</span>에 기여합니다.<br /><span className="fcgr"><small>2-1.</small> 취약계층에 대한 식량 접근성을 안정적으로 보장한다</span>
                        <span className="fcgr"><small>2-2.</small> 농가 소득원을 다각화하고, 경영 안전망을 확충하여 농가 소득 증대를 도모한다</span>
                        <span className="fcgr"><small>2-3.</small> 지속가능한 식량생산체계를 구축한다</span>
                        예스어스는 친환경 농산물을 지향하고, 못난이 농산물의 판로를 개척해 농가에 소득원을 제공하며 소비자에게는 저렴한 가격으로 농산물을 판매합니다.</p>
                    <p>K-SDGs 목표 11, 13.<br /><span className="bcy">기후변화 대응</span>에 앞장서며 <span className="bcy">지속가능한 도시와 주거지</span>를 만들어갑니다.<br /><span className="fcgr"><small>11-6.</small> 대기질 및 폐기물 관리 등 도시가 가지는 부정적인 환경영향을 감소시킨다</span>
                    <span className="fcgr"><small>13-4.</small> 지구의 온도 상승을 산업화 이전 수준에 비하여 2℃보다 아래로 유지하고 더 나아가 온도 상승을 1.5℃ 까지 제한하도록 노력한다</span>
                        예스어스는 자연재해 및 못난이 농산물을 소각하는데 발생하는 탄소를 줄여 폐기물을 관리하고 기후변화와 대기질 개선에 기여합니다.</p>
                    <p><strong>K-SDGs(국가 지속가능발전 목표) 달성을 위해
                    목표를 세우고, 함께 하는 기업들과 목표를 달성해갑니다</strong></p>
                </div>
                <div className="thumbnail"><img src="//yes-us.co.kr/web/upload/yesus/partner_img1.png" alt="" /></div>
            </div>
        </div>
        <div className="partner-sec2">
            <div className="partner-inner">
                <div className="text">
                    <h3>
                        <small>Point 2</small>
                        이벤트부터 꾸러미까지<br /> 다양한 형태의<br />
                        협업이 가능해요
                    </h3>
                    <p>사이트/SNS 이벤트 경품 제공부터 예스어스 고객 대상
                    샘플링, 전시 물품 제공, 꾸러미 대량 납품 등<br />
                    원하시는 어떠한 형태도 구현 가능한 방법을 찾아냅니다</p>
                </div>
                <div className="thumbnail"><img src="//yes-us.co.kr/web/upload/yesus/partner_img2.png" alt="" /></div>
            </div>
        </div>
        <div className="partner-sec3">
            <div className="partner-inner">
                <div className="text">
                    <h3>
                        <small>Point 3</small>
                        이미 많은 기업이<br />
                        예스어스와 함께 했습니다
                    </h3>
                    <p>현대카드, 샘표식품, YES24, 스노우피크 등<br />
                    이미 많은 기업이 예스어스와 다양한 ESG 프로젝트를
                    진행했습니다</p>
                    <p>한창 논의가 진행 중인 기업들은 갈수록 많아지고 있습니다</p>
                </div>
                <div className="thumbnail"><img src="//yes-us.co.kr/web/upload/yesus/partner_img3.png" alt="" /></div>
            </div>
        </div>

        <div className="partner-sec4">
            <h2>
                못난이 농산물로 하는<br />“ESG 프로젝트”<br />지금 바로 시작하세요
                <small>아래 양식에 맞춰 내용을 작성해주시면<br /> 담당자를 통해 연락드리겠습니다</small>
            </h2>
            <BoardWrite
            boardname="esg"
            />
            <BoardList
            list={''}
            boardname='review'
            coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt' }}
            getList={''}
            fixed
            reply
            />
        </div>
    </div>

  )
}
