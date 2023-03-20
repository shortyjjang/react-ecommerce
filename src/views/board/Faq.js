import React, { useState, useEffect, useCallback } from 'react'
import BoardPaging from '../../components/board/BoardPaging';
import BoardSearch from '../../components/board/BoardSearch';
import BoardSort from '../../components/board/BoardSort';
import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '../../_actions/shop_actions';

const { Panel } = Collapse;

export default function Faq(props) {
  const faq = useSelector(state => state.shop.board.faq);
  const dispatch = useDispatch()
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
    dispatch(getFaq(body))
  }, [])
  const onChangeSort = (e) => {
    setSortCate(e.target.value)
  }
  useEffect(() => {
    let body = {
      filter: searchData,
      sort: sortCate
    }
    if (!faq) getList(body)
  }, [])
  return (
    <div id="contents" className="faq">
      <div className="inner">
        <h2 className="titleArea">자주 묻는 질문</h2>
        <div className="boardWrap">
        <BoardSort
          onChangeSort={onChangeSort}
          options={[{ value: '0', name: '전체' }, { value: '1', name: '상품문의' }, { value: '2', name: '주문/결제문의' }, { value: '3', name: '교환/반품문의' }, { value: '4', name: '회원정보문의' }, { value: '7', name: '배송문의' }, { value: '8', name: '쿠폰/적립금' }, { value: '9', name: '기타문의' }, { value: '10', name: '정기구독문의' }]}
        />
        <Collapse
          expandIconPosition={'end'}
          ghost
        >
          {faq && faq.map(item =>
            <Panel header={item.subject} extra={<><span className="category">{item.category}</span> <span className="writer">{item.writer}</span></>} key={item.id}>
              <div dangerouslySetInnerHTML={{ __html: item.content }} ></div>
            </Panel>
          )}
        </Collapse>

        <BoardPaging />
        <BoardSearch searchList={searchList} setSearchData={setSearchData} />
        </div>
      </div>
    </div>
  )
}
