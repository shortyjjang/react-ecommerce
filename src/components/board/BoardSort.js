import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

export default function BoardSort(props) {
  return (
    <div className="boardSort">
      <Select defaultValue={props.options[0].name} name="search_date" onChange={(value) => props.onChangeSort(value)}>
        {props.options.map((option) => 
          <Option key={option.value} value={option.value}>{option.name}</Option>
        )}
      </Select>
      {/* {props.boardname === 'qna' && 
      <Select defaultValue="전체글보기" name="search_date" onChange={props.onChangeSort}>
        <Option value=''>전체글보기</Option>
        <Option value='N'>답변전 글보기</Option>
        <Option value='Y'>답변완료 글보기</Option>
      </Select>} */}
    </div>
  )
}
