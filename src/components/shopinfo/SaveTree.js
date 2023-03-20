import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import Api from '../../utils/customAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { changePriceFormat } from '../../_actions/product_action';

export default function SaveTree(props) {
  const [userSave, setUserSave] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getData = useCallback(async () => {
    let body = {
      mallCd: 'cafe24',
      username: props.username,
    };
    try {
      const res = await Api.get('/api/v1/saveEarth/getSaveEarthCO2', { params: body });
      setUserSave(res.data.result);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (!userSave) getData();
  }, []);

  return (
    <>
      {userSave && (
        <div className="card_box">
          {props.isLogin && (
            <div className="dis_point">
              {userSave.customerName}님은 지금까지 <br />
              <span className="fcg">
                {userSave.customerCO2eq_kg}kgCO2e
              </span>의 <br />
              온실가스를 줄였어요
            </div>
          )}
          <div className="w_back">
            <strong className="this_week">
              # 지난주 예스어스 리포트
              <br />
            </strong>
            <button className="info_btn" onClick={() => setShowModal(true)}>
              <ExclamationCircleOutlined />
            </button>
            <p>
              <span className="earth_due fw4">
                {moment(userSave.startDate).format('YY/MM/DD')} ~{' '}
                {moment(userSave.endDate).format('YY/MM/DD')}
              </span>{' '}
              총{' '}
              <span className="fcg weekCO2eq_kg">
                {changePriceFormat(userSave.weekCO2eq_kg)}kgCO2e
              </span>
              의 <br />
              온실가스를 절감했어요
            </p>
            지난주도 예스어스와 함께해 주셔서 감사합니다
            <span className="fcb fs14">
              *매주 월요일마다 지난 일주일(월~일)의 주문내역이 업데이트 됩니다
            </span>
          </div>
          <div className="w_back">
            <strong className="this_week"># WE SAVE 지구</strong>
            <div className="tree_box">
              <img
                src="//yes-us.co.kr/web/upload/yesus/tree_img.gif"
                alt="나무 자라는 애니메이션"
              />
              <strong>
                {changePriceFormat(userSave.totalSaveTreeCount)}그루
              </strong>
            </div>
            <div className="total_box">
              지금까지 우리가 줄인 온실가스는
              <span className="fcg">
                {changePriceFormat(userSave.totalCO2eq_kg)}kgCO2e
              </span>
              <br />
              <strong>
                총 {changePriceFormat(userSave.totalSaveTreeCount)}그루의 나무를
                심었어요
              </strong>
            </div>
            <span className="fcb fs14">
              *누적집계는 매일 오전 업데이트 됩니다
            </span>
          </div>
        </div>
      )}
      <Modal
        className="yesusReport"
        visible={showModal}
        onCancel={() => setShowModal(false)}
      >
        <p className="fs20">
          못난이 농산물을 처리하기 위해 <br />
          발생되는 이산화탄소는
          <strong>1g 당 1.65g</strong>에요
        </p>
        <p className="fs20">
          <strong>1,000kg</strong>의 이산화탄소 흡수를 위해선 <br />
          <strong>1그루</strong>의 어린 소나무를 심어야 해요
        </p>
      </Modal>
    </>
  );
}
