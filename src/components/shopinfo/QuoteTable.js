import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function money(num) {
  return new Intl.NumberFormat().format(num)
}
function BodyTable(props) {
  return (
    <>
      {props.data.filter((v, index) => index === 0).map((v, index) =>
        <tr key={index}>
          <td>{v.itemName}</td>
          <td className="pc">무농약 이상</td>
          <td>{v.itemWeight}g</td>
          <td className="pc">{money(v.itemMarketPrice)}원</td>
          <td>{money(v.itemPrice)}원</td>
          <td rowSpan={props.data.length} className="bb0 fw9">{money(props.data[props.lastChild].productPrice)}원</td>
          <td rowSpan={props.data.length} className="bb0 fw9 br0 bgwy fcg">
            {props.data[props.lastChild].diffPercent}%
            <p className="dis_price">{money(props.data[props.lastChild].itemPrice - 15000)}원</p>
          </td>
        </tr>
      )}
      {props.data.filter((v, index) => index !== props.lastChild && index !== 0).map((v, index) =>
        <tr key={index}>
          <td>{v.itemName}</td>
          <td className="pc">무농약 이상</td>
          <td>{v.itemWeight}g</td>
          <td className="pc">{money(v.itemMarketPrice)}원</td>
          <td>{money(v.itemPrice)}원</td>
        </tr>
      )}
    </>
  )
}
function TotalTable(props) {
  return (
    <>
      {props.data.filter((v, index) => index === props.lastChild).map((v, index) =>
        <tr key={index}>
          <td className="colspan">합계</td>
          <td className="pc"></td>
          <td>{v.itemWeight / 1000}Kg</td>
          <td className="pc">-</td>
          <td className="ta_r">{money(v.itemPrice)}원</td>
        </tr>
      )}
    </>
  )
}
export default function QuoteTable(props) {
  const [deliDate, setDeliDate] = useState('');
  const [lastChild, setLastChild] = useState(0);
  useEffect(() => {
    if (props.data.length > 0) {
      setDeliDate(dayjs(props.data[0].deliveryPlanDate).format('YY/MM/DD'));
      setLastChild(props.data.length - 1)
    }
  }, [props.data])

  return (
    <div className="wht_box">
      <div className="title_line">
        <strong>이 주의 어스박스(<b className="deli_date">{deliDate}</b> 발송분)</strong>
        <span>시세참고 : <a href="https://www.kamis.or.kr/customer/price/eco/summary.do" rel="noreferrer" className="fcb" target="_blank">KAMIS 친환경농산물 유통정보</a></span>
      </div>
      <table className="price_table">
        <caption>어스박스 품목 비교 표</caption>
        <thead>
          <tr>
            <th scope="row">품목</th>
            <th className="ta_l pc" scope="row">인증</th>
            <th scope="row">중량(g)</th>
            <th className="ta_r pc" scope="row">시세(Kg당)</th>
            <th className="ta_r" scope="row">시세(구성)</th>
            <th className="fw9 ta_r" scope="row" >예스어스</th>
            <th className="fw9 ta_r br0 bgwy" scope="row">절약</th>
          </tr>
        </thead>
        <tbody>
          <BodyTable data={props.data} lastChild={lastChild} deliDate={deliDate}
            setLastChild={setLastChild} setDeliDate={setDeliDate} />
          <TotalTable data={props.data} lastChild={lastChild} deliDate={deliDate}
            setLastChild={setLastChild} setDeliDate={setDeliDate} />
        </tbody>
      </table>
      <p className="ta_l">어스박스는 개인화서비스로 품목의 구성과 중량은 개인별로 상이할 수 있습니다.</p>
    </div>
  );
}
