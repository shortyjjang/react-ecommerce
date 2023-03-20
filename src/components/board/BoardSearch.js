import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function BoardSearch(props) {
  return (
    <fieldset className="boardSearch">
      <form onSubmit={props.searchList}>
        <Select defaultValue="제목" name="search_key" onChange={(value) => props.setSearchData({...props.searchData, search_key: value})}>
          <Option value="subject">제목</Option>
          <Option value="content">내용</Option>
          <Option value="writer_name">글쓴이</Option>
          <Option value="member_id">아이디</Option>
          <Option value="nick_name">별명</Option>
        </Select>
        <input className="inputTypeText" name="search_msg" type="text" onChange={(e) => props.setSearchData({...props.searchData, search_msg: e.target.value})} onKeyDown={(e) => { if (e.key === 'Enter') props.setSearchData({...props.searchData, search_msg: e.target.value}) }} />
        <button className="btnEmFix" type="submit">검색</button>
      </form>
    </fieldset>
  );
}

export default BoardSearch;