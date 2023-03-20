import React from 'react';
import { Link } from 'react-router-dom'
import { UpOutlined, DownOutlined } from '@ant-design/icons';

export default function BoardPreview(props) {
  return (
    <ul className="boardPreview">
      <li><Link to={props.prevLink}><strong><UpOutlined /> 이전글</strong>어스박스 품목 변경에 대한 사전 안내</Link></li>
      <li><Link to={props.nextLink}><strong><DownOutlined /> 다음글</strong>12월 2차 리뷰 이벤트 당첨자 발표</Link></li>
    </ul>
  );
}