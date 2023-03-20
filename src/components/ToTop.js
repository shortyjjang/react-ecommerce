import React from 'react';
import { Progress } from 'antd';
import {ArrowUpOutlined} from '@ant-design/icons'

export default function ToTop(props) {
  const scrollToTop = () => window.scrollTo(0)
  return (
    <>
      {props.showTopBtn && <div className="btn_top" onClick={scrollToTop}>
        <Progress type="circle" percent={props.percentage} width={50} />
        <ArrowUpOutlined /> 
      </div>}
    </>
  );
}