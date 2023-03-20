import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BoardList from '../../components/board/BoardList';
import { getNotice } from '../../_actions/shop_actions';

export default function Notice() {
  const dispatch = useDispatch()
  const notice = useSelector(state => state.shop.board.notice)
  const [sortCate, setSortCate] = useState(0);
  const [searchData, setSearchData] = useState({
    search_msg: '',
    search_key: ''
  })
  const searchList = (e) => {
    e.preventDefault();
    let body = {
      filter: searchData,
      sort: sortCate
    }
    getList(body)
  }
  const getList = useCallback(async (body) => {
    dispatch(getNotice(body))
  }, [])
  useEffect(() => {
    let body = {
      filter: searchData,
      sort: sortCate
    }
    if (!notice) getList(body)
  }, [notice])
  return (
    <div id="contents" className="notice">
      <div className="inner">
        <h2 className="titleArea">공지사항</h2>
        {notice && <BoardList
          list={notice}
          boardname='notice'
          coloumns={{ no: 'id', title: 'subject', writer: 'writer', date: 'createdAt', category: 'category' }}
          sort={[{ name: '전체', value: '0' }, { name: '알림', value: '1' }, { name: '이벤트', value: '2' }, { name: '당첨자', value: '3' }]}
          sortCate={sortCate}
          searchData={searchData}
          setSortCate={setSortCate}
          searchList={searchList} 
          setSearchData={setSearchData}
          getList={getList}
          fixed
          search
        />}
      </div>
    </div>
  )
}
