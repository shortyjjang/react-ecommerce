import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Modal, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import Api from '../../utils/customAPI';
import moment from 'moment';
import 'moment/locale/ko';

export default function OrderUsbox(props) {
  const user = useSelector((state) => state.user);
  const order = props.order;
  const [orderDetail, setOrderDetail] = useState();
  const [showVegeList, setShowVegeList] = useState(false);
  const [skipVegetable, setSkipVegatable] = useState([]);
  const getOrderDetail = async (id) => {
    const request = await Api.get('/customer/getMyRandomProductOrder', {
      params: {
        mallCd: 'cafe24',
        username: user.username,
        opId: id,
      },
    }).then((request) => request.data.result);
    setOrderDetail(request);
    setSkipVegatable(
      request.includeItems.filter((v) => v.skipYn === 'Y' || v.hateYn === 'Y'),
    );
  };
  const checkSkipVegatables = (item) => {
    item = { ...item, skipYn: 'Y' };
    if (!skipVegetable.find((v) => v.itemId === item.itemId)) {
      setSkipVegatable(skipVegetable.concat(item));
    } else {
      setSkipVegatable(skipVegetable.filter((v) => v.itemId !== item.itemId));
    }
  };
  const updateVege = async (oId) => {
    let data = {
      orderId: oId,
      items: skipVegetable,
    };
    if (
      skipVegetable.length -
        vegetable.includeItems.filter(
          (v) => v.hateYn === 'Y' || v.skipYn === 'Y',
        ).length >
      2
    ) {
      alert('스킵채소는 최대 2개까지 등록(체크해제) 가능해요!');
    } else {
      const request = await Api.post(
        '/customer/updateMyRandomProductItemOrder',
        data,
      );
      if (request.status === '200')
        alert('스킵채소가 정상적으로 등록되었습니다.');
    }
  };
  useEffect(() => {
    if (!orderDetail) getOrderDetail(order.opId);
  }, [order.opId]);
  return (
    <>
      <img
        src="//yes-us.co.kr/web/product/big/202111/c7dce572aad18b779ea5ff6f07cd272b.png"
        className="thumbnail"
        alt=""
      />
      <strong>{order.productName}</strong>

      {orderDetail && (
        <div className="usbox-detail_recommend">
          이번 주 발송 품목
          <b>
            {orderDetail.includeItems
              .filter((item) => item.skipYn === 'N' && item.hateYn === 'N')
              .map((item, index) => (
                <span key={index}>
                  {index !== 0 && ','} {item.itemName}
                </span>
              ))}
          </b>
        </div>
      )}

      {order.opRandomItemsConfirmed && (
        <div className="tip">
          * 스킵 채소는 최대 2개까지 선택할 수 있어요
          <br />*{' '}
          {moment(order.deliveryBookDate)
            .subtract(1, 'days')
            .format('M/D(dd)')}{' '}
          오전까지 수정할 수 있어요
        </div>
      )}
      {orderDetail && (
        <button className="btnNormal" onClick={() => setShowVegeList(true)}>
          {orderDetail.editableYn === 'N'
            ? '선택한 스킵 채소 보기'
            : '스킵 채소 선택하기'}
        </button>
      )}
      {orderDetail && (
        <Modal
          title={`${moment(orderDetail.deliveryPlanDate).format(
            'M/D',
          )}(목)에 발송될 ${orderDetail.customerName}님의 어스박스`}
          visible={showVegeList}
          onOk={() => {
            setShowVegeList(false);
            setSkipVegatable([]);
          }}
          onCancel={() => {
            setShowVegeList(false);
            setSkipVegatable([]);
          }}
          className="checkVegetable"
        >
          <div className="checklist">
            {orderDetail.includeItems &&
              orderDetail.includeItems.map((item, index) => (
                <Checkbox
                  key={index}
                  onChange={() => checkSkipVegatables(item)}
                  checked={!skipVegetable.find((v) => v.itemId === item.itemId)}
                  disabled={
                    orderDetail.editableYn === 'N' || item.hateYn === 'Y'
                  }
                >
                  {item.itemName}
                </Checkbox>
              ))}
          </div>
          {user.userInfo.hateVegetables && (
            <p>
              <strong>
                못 먹는 채소로 {user.userInfo.hateVegetables}을(를)
                등록하셨습니다.
                <br />이 중 받아보시길 원하는 채소가 있을 경우 1:1게시판으로
                문의주세요.
              </strong>
            </p>
          )}
          {orderDetail.editableYn === 'Y' && (
            <p>
              <strong>
                혹시 패스하고 싶은 채소가 있나요?
                <br />
                제외 품목은 대체하여 보내드릴께요!
              </strong>
              <br />
              *패스채소는 최대 2개까지 등록(체크해제) 가능해요.
              <br />
              **{moment(orderDetail.editableTime).format('M/D')} (수) 오전 9시
              까지 다시 수정할 수 있어요
            </p>
          )}
          <p>
            [안내] 어스박스 구성 채소는 산지 사정에 따라 일부 변경될 수 있으며,
            변경 시 별도 안내됩니다.
          </p>
          {orderDetail.editableYn === 'Y' && (
            <button
              onClick={() =>
                updateVege(
                  orderDetail.includeItems.filter(
                    (item) => item.skipYn === 'N',
                  ),
                )
              }
              className="btnNormal"
            >
              선택하기
            </button>
          )}
        </Modal>
      )}
    </>
  );
}
