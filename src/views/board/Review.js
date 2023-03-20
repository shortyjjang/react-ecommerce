import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardList from '../../components/board/BoardList';
import { getReview } from '../../_actions/shop_actions';

export default function Notice() {
  const reviews = useSelector(state => state.shop.board.review)
  const dispatch = useDispatch()
  const getList = async (body) => {
    if (!body) body = {}
    dispatch(getReview({}))
  }
  useEffect(() => {
    if (!reviews) getList()
  }, [])
  return (
    <div id="contents" className="review">
      <div className="inner">
        <h2 className="titleArea">상품구매후기</h2>
        <Link to="/notice/288/" className="event_banner"><img src="//yes-us.co.kr/web/upload/a0cd4dfedeb89b83d4b48cab05203533.png" alt="리뷰이벤트" className="pc" /><img src="//yes-us.co.kr/web/upload/yesus/popup/상품구매후기_sp.png" alt="리뷰이벤트" className="mobile" /></Link>
        {reviews && <BoardList
          list={reviews}
          boardname='review'
          coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', product: 'product_no', score: 'score', vote: 'vote' }}
          getList={getList}
          fixed
          reply
          write
        />}
      </div>
    </div>
  )
}