import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardView from '../../components/board/BoardView';
import { getReview } from '../../_actions/shop_actions';

export default function ReviewView(props) {
  const reviews = useSelector(state => state.shop.board.review)
  const params = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    if (!reviews) dispatch(getReview({}))
  }, [])
  return (
    <div id="contents" className="review">
      <div className="inner">
        <h2 className="titleArea">상품구매후기</h2>
        {reviews && reviews.find(item => item.id === Number(params.id)) && <BoardView
          postData={reviews.find(item => item.id === Number(params.id))}
          coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', product: 'product_no', score: 'score', vote: 'vote' }}
          boardname='review'
        />}
      </div>
    </div>
  );
}