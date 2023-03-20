import React from 'react'
import BoardWrite from '../../components/board/BoardWrite'

export default function ReviewWrite() {
  return (
    <div id="contents" className="review">
      <div className="inner">
        <h2 className="titleArea">상품구매후기</h2>
        <BoardWrite
          boardname="review"
          coloumns={['product', 'score', 'file', 'url']}
        />
      </div>
    </div>
  )
}
