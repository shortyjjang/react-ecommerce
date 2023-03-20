import React from 'react'
import BoardWrite from '../../components/board/BoardWrite'

export default function QnAWrite() {
  return (
    <>
      <div id="contents" className="qna">
        <div className="inner">
          <h2 className="titleArea">1:1 문의</h2>
          <BoardWrite
            boardname="qna"
            coloumns={['product', 'file', 'secret']}
            category={[{ name: '전체', value: '0' }, { name: '상품문의', value: '1' }, { name: '주문/결제문의', value: '2' }, { name: '교환/반품문의', value: '3' }, { name: '회원정보문의', value: '4' }, { name: '취소문의', value: '5' }, { name: '기타문의', value: '6' }]}
          />
        </div>
      </div>
    </>
  )
}
