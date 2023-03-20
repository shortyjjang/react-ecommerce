import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../../components/board/BoardItem';
import BoardPaging from '../../components/board/BoardPaging';
import BoardSearch from '../../components/board/BoardSearch';
import BoardSort from '../../components/board/BoardSort';
import { Modal } from 'antd';

const { confirm } = Modal

export default function BoardList(props) {
  const isLogin = useSelector(state => state.user.authenticated)
  const navigate = useNavigate()
  const onChangeSort = (e) => {
    let body = {
      filter: props.searchData,
      sort: e.target.value
    }
    props.setSortCate(e.target.value)
    props.getList(body)
  }
  const searchList = (e) => {
    e.preventDefault();
    let body = {
      filter: props.searchData,
      sort: props.sortCate
    }
    props.getList(body)
  }
  const addPost = () => {
    if (isLogin) {
      navigate(`/${props.boardname}/write`)
    } else {

      confirm({
        title: '로그인 후 작성하실 수 있습니다.',
        okText: '로그인 하기',
        cancelText: '취소',
        onOk() { navigate('/login') },
      });
    }
  }
  return (
    <div className="boardWrap">
      {props.sort && <BoardSort
        onChangeSort={onChangeSort}
        options={props.sort}
        boardname={props.boardname}
      />}
      <ul className="boardHeader">
        {props.coloumns.hasOwnProperty('no') && <span className="no">번호</span>}
        {props.coloumns.hasOwnProperty('product') && <span className="thumbnail">상품</span>}
        {props.coloumns.hasOwnProperty('category') && <span className="category">카테고리</span>}
        {props.coloumns.hasOwnProperty('title') && <span className="subject">제목</span>}
        {props.coloumns.hasOwnProperty('writer') && <span className="writer">작성자</span>}
        {props.coloumns.hasOwnProperty('date') && <span className="date">작성일</span>}
        {props.coloumns.hasOwnProperty('hit') && <span className="hit">조회</span>}
        {props.coloumns.hasOwnProperty('vote') && <span className="vote">추천</span>}
        {props.coloumns.hasOwnProperty('score') && <span className="score">평점</span>}
      </ul>
      {props.list.length > 0 ?
        <ul className="boardList">
          <BoardItem list={props.list} boardname={props.boardname} coloumns={props.coloumns} fixed={props.fixed} reply={props.reply} />
        </ul>
        : <div className="empty"></div>
      }
      <BoardPaging boardname={props.boardname} />
      {props.write && <div className="boardBtns"><button onClick={addPost} className="btnNormal">글쓰기</button></div>}
      {props.search && <BoardSearch searchList={searchList} setSearchData={props.setSearchData}  />}

    </div>
  )
}
