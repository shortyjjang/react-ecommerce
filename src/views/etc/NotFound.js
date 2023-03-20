import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound">
      <span className="errorNum">4<em>0</em>4</span>
      <strong>Oops, Page not found!</strong>
      <div className="btns">
        <button className="btnNormal" onClick={() => navigate(-1)}>이전페이지로 가기</button>
        <Link to="/" className="btnNormal">홈으로 가기</Link>
      </div>
    </div>
  )
}
