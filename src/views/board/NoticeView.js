import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardView from '../../components/board/BoardView';
import { getNotice } from '../../_actions/shop_actions';

function NoticeView(props) {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.shop.board.notice)
  const params = useParams();

  const getData = async (body) => dispatch(getNotice(body))

  useEffect(() => {
    if (!lists) getData({})
  }, [])
  return (
    <div id="contents" className="blog">
      <div className="inner">
        <h2 className="titleArea">공지사항</h2>
        {lists && lists.find(item => item.id === Number(params.id)) && <BoardView
          boardname='notice'
          postData={lists.find(item => item.id === Number(params.id))}
          coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', category: 'category' }}
        />}
      </div>
    </div>
  );
}

export default NoticeView;