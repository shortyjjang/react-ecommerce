import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardView from '../../components/board/BoardView';
import { getQna } from '../../_actions/shop_actions';

export default function QnAView(props) {
  const qna = useSelector(state => state.shop.board.qna)
  const params = useParams();
  const dispatch = useDispatch()
  const getData = async (postId) => {
    try {
      dispatch(getQna({}))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (!qna || qna.find(item => item.id === Number(params.id))) getData(params.id)
  }, [params.id])
  return (
    <>
      <div id="contents" className="qna">
        <div className="inner">
          <h2 className="titleArea">1:1 문의</h2>
          {qna && qna.find(item => item.id === Number(params.id)) && <BoardView
            postData={qna.find(item => item.id === Number(params.id))}
            boardname='qna'
            coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', category: 'category' }}
          />}
        </div>
      </div>
    </>
  );
}