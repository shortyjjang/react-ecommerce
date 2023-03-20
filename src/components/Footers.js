import React from 'react'
import { Link } from 'react-router-dom'

export default function Footers() {
  return (
    <div id="footer">
      <div className="foot_wrap inner">
        <div className="foot_info">
          <div className="fcgr">고객센터</div>
          <strong>070-4763-8287</strong>
          <small>평일 10:00 – 18:00 (점심 12:00 – 13:00)</small>
          <small>토요일, 일요일, 공휴일 휴무</small>
        </div>
        <ul className="link_line">
          <li><Link to="/agreement">이용약관</Link></li>
          <li className="bordered"><Link to="/privacy">개인정보처리방침</Link></li>
          <li><Link to="/guide">이용안내</Link></li>
        </ul>
        <ul className="info">
          <li><label className="fcgr">상호:</label> 예스어스</li>
          <li><label className="fcgr">사업자등록번호:</label> 273-85-01735<a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2738501735" target="_blank" rel="noreferrer">[사업자정보확인]</a></li>
          <li><label className="fcgr">대표자:</label> 정한석</li>
          <li><label className="fcgr">통신판매업:</label> 2021-성남분당C-1220</li>
          <li><label className="fcgr">개인정보보호책임자:</label> 김진환 (<a href="mailto:redwolf@a2dcorp.co.kr;">redwolf@a2dcorp.co.kr</a>)</li>
          <li className="addr"><label className="fcgr">주소:</label> 05855 서울특별시 송파구 법원로8길 7 (문정동) 화엄타워 5층</li>
          <li className="email"><label className="fcgr">이메일:</label> <a href="mailto:g9intable@a2dcorp.co.kr;">g9intable@a2dcorp.co.kr</a></li>
        </ul>
        <p className="copyright">Copyright ©예스어스 All rights reserved.</p>
        <div className="social">
          <a href="https://pf.kakao.com/_jxmxkys" target="_blank" rel="noreferrer" className="kakao">카카오톡</a>
          <a href="https://www.instagram.com/yes_earth/" target="_blank" rel="noreferrer" className="instagram">인스타그램</a>
        </div>
      </div>
    </div>
  )
}
