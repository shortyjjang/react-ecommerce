import React from 'react'

export default function Contact() {
  return (
    <div id="contents" className="contact">
      <h2 className="titleArea">Contact Us</h2>
      <div className="inner">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.0249460931686!2d127.1193195160752!3d37.48373768662181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca5f487f51a9d%3A0x64f74e08258f1d15!2z6riA66Gc67KM7JeQ7J207ZSM65-s7Iqk!5e0!3m2!1sko!2skr!4v1656484260887!5m2!1sko!2skr" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <ul className="info">
          <li>
            <label>Adress</label>
            <address>05855 서울특별시 송파구 법원로8길 7 (문정동) 화엄타워 5층</address>
            <span>평일 10:00 -18:00</span>  <span>점심 12:00 - 13:00</span>  <span>토요일, 일요일, 공휴일 휴무</span>
          </li>
          <li><label>Tel</label> <a href="tel:070-4763-8287">070-4763-8287</a></li>
          <li><label>Email</label> <a href="mailto:g9intable@a2dcorp.co.kr">g9intable@a2dcorp.co.kr</a></li>
        </ul>
      </div>
    </div>
  )
}
