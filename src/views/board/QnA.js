import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BoardList from '../../components/board/BoardList';
import { getQna } from '../../_actions/shop_actions';

export default function QnA() {
  const qna = useSelector(state => state.shop.board.qna)
  const [sortCate, setSortCate] = useState(0);
  const [searchData, setSearchData] = useState([])
  const dispatch = useDispatch()
  const getList = useCallback(async (body) => {
    try {
      dispatch(getQna(body))
    } catch (err) {
      console.log(err)
    }
  }, [])
  useEffect(() => {
    let body = {
      filter: searchData,
      sort: sortCate
    }
    if (!qna) getList(body)
  }, [])
  return (
    <>
      <div id="contents" className="qna">
        <div className="inner">
          <h2 className="titleArea">1:1 문의</h2>
          {qna && <BoardList
            list={qna}
            sort={[{ name: '전체', value: '0' }, { name: '상품문의', value: '1' }, { name: '주문/결제문의', value: '2' }, { name: '교환/반품문의', value: '3' }, { name: '회원정보문의', value: '4' }, { name: '취소문의', value: '5' }, { name: '기타문의', value: '6' }]}
            sortCate={sortCate}
            searchData={searchData}
            boardname='qna'
            coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', category: 'category' }}
            setSortCate={setSortCate}
            setSearchData={setSearchData}
            getList={getList}
            reply
            write
            search
          />}
        </div>
      </div>
    </>
  )
}
