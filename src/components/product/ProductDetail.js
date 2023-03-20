import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import BoardList from '../../components/board/BoardList'
import { useDispatch, useSelector } from 'react-redux';
import { getReview, getQna } from '../../_actions/shop_actions'

const { TabPane } = Tabs;

export default function ProductDetail(props) {
  const board = useSelector(state => state.shop.board);
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!board.review) dispatch(getReview({}))
    if (!board.qna) dispatch(getQna({}))
  }, [board.review, board.qna])
  return (
    <Tabs defaultActiveKey="1" className="inner" id="detail">
      <TabPane tab="상품 상세" key="1">
        <div className="detail_div" dangerouslySetInnerHTML={{ __html: props.item.productDetailDescHtml }} ></div>
      </TabPane>
      <TabPane tab={"안내"} key="2" className="info_div">
        <p className="title">결제 안내</p>
        <div className="contents" dangerouslySetInnerHTML={{ __html: props.item.productPaymentInfoHtml}}></div>
        <p className="title">배송 안내</p>
        <div className="contents" dangerouslySetInnerHTML={{ __html: props.item.productShippingInfoHtml}}></div>
        <p className="title">교환 안내</p>
        <div className="contents" dangerouslySetInnerHTML={{ __html: props.item.productExchangeInfoHtml}}></div>
      </TabPane>
      <TabPane tab={`후기`} key="3" className="use_review">

        {board.review && board.review.filter(post => post.product_no === Number(params.id)).length > 0 && <BoardList
          list={board.review.filter(post => post.product_no === Number(params.id))}
          boardname='review'
          coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', score: 'score' }}
          fixed
        />}
        <div className="boardBtns">
          <Link to="/review" className="btnNormal all">모두보기</Link>
          <Link to="/review/write" className="btnNormal">후기쓰기</Link>
        </div>
      </TabPane>
      {props.isLogin &&
        <TabPane tab={`문의`} key="4" className="use_review">
          {board.qna && board.qna.filter(post => post.product_no === Number(params.id)).length > 0 && <BoardList
            list={board.qna.filter(post => post.product_no === Number(params.id))}
            boardname='qna'
            coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt' }}
            fixed
          />}
          <div className="boardBtns">
            <Link to="/qna" className="btnNormal all">모두보기</Link>
            <Link to="/qna/write" className="btnNormal">문의쓰기</Link>
          </div>

        </TabPane>}
    </Tabs>
  )
}