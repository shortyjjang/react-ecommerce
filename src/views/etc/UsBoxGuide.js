import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd';

export default function UsBoxGuide() {
  const [showModalF, setShowModal] = useState({
    customizing: false,
    allergy: false,
    fix_order: false,
    delivery: false,
    recipient: false,
    terminate: false,
    benefit: false,
  })
  const showModal = (name) => {
    setShowModal({
        ...showModalF,
        [name]: !showModalF[name]
    })
  }
  return (
    <div className="usbox_guide">
        <h2>어스박스 이용 가이드</h2>
        <ul className="guide_index"><li><button className="ug1" onClick={() => showModal('customizing')}>좋아하는<br /> 채소 담기</button></li>
            <li><button className="ug2" onClick={() => showModal('allergy')}>알러지 채소<br /> 등록</button></li>
            <li><button className="ug3" onClick={() => showModal('fix_order')}>주문<br /> 확정</button></li>
            <li><button className="ug4" onClick={() => showModal('delivery')}>배송 일정<br /> 변경</button></li>
            <li><button className="ug5" onClick={() => showModal('recipient')}>배송지<br /> 변경</button></li>
            <li><button className="ug6" onClick={() => showModal('terminate')}>정기구독<br /> 해지</button></li>
            <li><button className="ug7">맞춤형<br /> 레시피 즐기기</button></li>
            <li><button className="ug8" onClick={() => showModal('benefit')}>혜택<br /> 안내</button></li>
        </ul>
        <div className="btns"><Link to='/usbox/subscribe' className="btnNormal btnSubmit">어스박스 시작하기</Link></div>
        <Modal title="좋아하는 채소 담기" visible={showModalF.customizing} footer={[]} onCancel={() => showModal('customizing')} className="guide_popup">
            <ol>
                <span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop1_img1.png')`}}></span>
                <li>
                    <span className="bullet">①</span> <Link to="/usbox/subscribe">어스박스 신청</Link> 후 <Link to="/myshop">마이페이지</Link>에 접속해요
                    <small>※ 개인화 동기화까지 최대 30분 가량 소요됩니다.<br />※ 문의사항 발생 시 1:1 문의 또는 고객센터로 연락 부탁드립니다.</small></li>
                    <span className="thumbnail full" style={{
                        backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop1_img2.png?2')`
                    }}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop1_img2_pc.png" alt="마이페이지" /></span>
                <li>
                    <span className="bullet">②</span> 받고싶은 채소가 있다면 <b>좋아요</b>를, 필요하지 않은 채소는 <b>싫어요</b>를 눌러 페스하고</li>
                <li><span className="bullet">③</span> [확인]을 눌러 저장해요
                    <ul><li><span className="bullet">-</span> 스크롤을 내려 더 많은 품목을 확인해요</li>
                        <li><span className="bullet">-</span> 좋아요는 최대 5개, 싫어요는 2개까지</li>
                        <li><span className="bullet">-</span> 선택할 수 있으며 매 주 <b>수요일 오전 9시</b>까지 수정할 수 있어요.</li>
                    </ul></li>
            </ol>
        </Modal>
        <Modal title="알러지 채소 등록" visible={showModalF.allergy} footer={[]} onCancel={() => showModal('allergy')} className="guide_popup">
            <ol><span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop2_img1.png')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop2_img1_pc.png" alt="마이페이지" /></span>
                <li><span className="bullet">①</span> <Link to="/myshop">마이페이지</Link> 접속 후 이름 옆 <Link to="/member/modify"><img src="//yes-us.co.kr/web/upload/yesus/gear.png"  alt="회원정보수정" /></Link> 아이콘을 클릭해요.</li>
                <span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop2_img2.png')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop2_img2_pc.png" alt="회원정보" /></span>
                <li><span className="bullet">②</span> 알러지나 다른 이유로 먹지 못하는 채소를 선택 후 [회원정보수정]버튼을 눌러 저장해요</li>
            </ol>
        </Modal>
        <Modal title="주문 확정" visible={showModalF.fix_order} footer={[]} onCancel={() => showModal('fix_order')} className="guide_popup">
            <ol><span className="thumbnail full" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop3_img1.png?1')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop3_img1_pc.png" alt="마이페이지" /></span>
                <b>매 주 수요일 오전 9시에 주문이 확정돼요.</b>
                <li><span className="bullet">①</span> 주문확정 후 <Link to="/myshop">마이페이지</Link>에서 내가 받아볼 채소를 확인할 수 있고, 품목 변경은 불가해요.</li>
                <li><span className="bullet">②</span> 주문확정 후 오른쪽으로 넘겨 다음 주 어스박스를 커스터마이징 할 수 있어요.</li>
            </ol>
        </Modal>
        <Modal title="배송 일정 변경" visible={showModalF.delivery} footer={[]} onCancel={() => showModal('delivery')} className="guide_popup">
            <ol><li><span className="bullet">①</span> <Link to="/usbox/subscribe">어스박스 신청</Link> 후 <a href="/myshop/regular_delivery.html">정기구독 관리</a>에 접속해요</li>
                <li><span className="bullet">②</span> 이번 어스박스 수령이 어렵다면 <b>원하는 주차로 발송일을 변경</b>해요.</li>
                <small>※ 어스박스는 매 주 목요일에 발송됩니다. </small>
                <span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop4_img1.png')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop4_img1_pc.png" alt="정기구독 관리" /></span>
                <li><span className="bullet">③</span> 내 소비패턴에 맞춰 배송 주기를 변경해요</li>
                <small>※ 매 주 <strong>수요일 오전 9시 이전</strong> 수정 시 반영</small>
                <span className="thumbnail hide" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop4_img2.png')`}}></span>
            </ol>
        </Modal>
        <Modal title="배송지 변경" visible={showModalF.recipient} footer={[]} onCancel={() => showModal('recipient')} className="guide_popup">
            <ol><span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop5_img1.png')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop5_img1_pc.png" alt="정기구독 관리" /></span>
                <li><span className="bullet">①</span> <Link to="/usbox/subscribe">어스박스 신청</Link> 후 <Link to="/myshop/regular_delivery.html">정기구독 관리</Link>에 접속해요</li>
                <li><span className="bullet">②</span> [수령 정보 변경]을 클릭하고 수령 정보를 변경할 수 있어요.</li>
            </ol>
            <small>※ 매 주 <strong>수요일 오전 9시 이전</strong> 수정 시 반영</small>
        </Modal>
        <Modal title="정기구독 해지" visible={showModalF.terminate} footer={[]} onCancel={() => showModal('terminate')} className="guide_popup">
            <ol><span className="thumbnail" style={{backgroundImage:`url('//yes-us.co.kr/web/upload/yesus/usbox_guid_pop6_img1.png')`}}><img src="//yes-us.co.kr/web/upload/yesus/usbox_guid_pop6_img1_pc.png" alt="정기구독 관리" /></span>
                <li><span className="bullet">①</span> <Link to="/usbox/subscribe">어스박스 신청</Link> 후 <Link to="/myshop/regular_delivery.html">정기구독 관리</Link>에 접속해요</li>
                <li><span className="bullet">②</span> <b>[정기구독 해지]</b>를 클릭하면 더 이상 어스박스를 받아보지 않을 수 있어요.</li>
            </ol>
        </Modal>
        <Modal title="혜택 안내" visible={showModalF.benefit} footer={[]} onCancel={() => showModal('benefit')} className="guide_popup">
            <div className="beneft_detail">
                <h4 className="banner1">첫 구매 시<br /> 시크릿 굿즈 증정</h4>
                <p>어스박스 첫 구매 시 시크릿 굿즈를 드려요.<br />어떤 시크릿 굿즈를 받게될지 기대해봐요!</p>
            </div>
            <div className="beneft_detail">
                <h4 className="banner2">구매할수록<br /> 커지는 혜택!</h4>
                <p>1~6회차 구매 시 500원, 7회차부터 매 주 1,000원 할인이 적용됩니다.</p>
            </div>
            <div className="beneft_detail">
                <h4 className="banner3">제휴 이벤트</h4>
                <p>샘표, YES24 등 함께 협업하는 기업들과 이벤트를 진행해요.<br />사은품 및 포인트 등 다양한 혜택을 드려요.</p>
                <small>* 제휴 이벤트는 비정기적으로 진행됩니다</small>
            </div>
        </Modal>
    </div>
  )
}
