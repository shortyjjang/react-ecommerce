import React, { useState } from 'react';

import { Radio } from 'antd';
import Address from '../Address';
import { EnvironmentOutlined } from '@ant-design/icons';

export default function DeliveryAddress(props) {
  const [lastAddr, setLastAddr] = useState(false);
  const [showAddrList, setShowAddrList] = useState(false);

  return (
    <>
      {lastAddr ? (
        <div className="addressList">
          {showAddrList ? (
            <>
              <h3 className="heading">
                <EnvironmentOutlined /> 배송지를 선택해 주세요.
              </h3>
              <Radio.Group
                onChange={props.onChange}
                value={props.values.shippingBasic_code}
                name="shippingBasic_code"
              >
                <Radio key={1} value={1}>
                  <strong>
                    <b>[기본]</b> 테스터일
                  </strong>
                  <address>
                    [427703] 경기도 과천시 막계동 서울랜드
                    <br />
                    바이킹 3라인 가운데
                  </address>
                  <small>010-1234-4321</small>
                  <small>02-000-0000</small>
                  <button onClick={() => setShowAddrList(false)}>수정</button>
                </Radio>
                <Radio key={17} value={17}>
                  <strong>테스터일5</strong>
                  <address>
                    [427703] 경기도 과천시 막계동 서울랜드
                    <br />
                    바이킹 3라인 가운데
                  </address>
                  <small>010-1234-4321</small>
                  <small>02-000-0000</small>
                  <button onClick={() => setShowAddrList(false)}>수정</button>
                </Radio>
              </Radio.Group>
            </>
          ) : (
            <>
              <button
                className="btnNormal mini"
                onClick={() => setShowAddrList(true)}
              >
                배송지 목록
              </button>
              <strong>
                <b>[기본]</b> 테스터일5
              </strong>
              <address>
                [427703] 경기도 과천시 막계동 서울랜드
                <br />
                바이킹 3라인 가운데
              </address>
              <small>010-1234-4321</small>
              <small>02-000-0000</small>
            </>
          )}
        </div>
      ) : (
        <div className="newAddress">
          <Radio.Group
            onChange={props.onChange}
            value={props.values.sameaddr}
            name="sameaddr"
          >
            <Radio value={true}>회원 정보와 동일</Radio>
            <Radio value={false}>새로운 배송지</Radio>
          </Radio.Group>
          <Address
            values={props.values}
            onChange={props.onChange}
            setShowPostal={props.setShowPostal}
            setValue={props.setValue}
          />
        </div>
      )}
    </>
  );
}
