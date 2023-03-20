import React from 'react'
import { Link } from 'react-router-dom'

export default function BoardPaging(props) {
  return (
    <div className="boardPaging">
      <Link to="?board_no=8&amp;page=1" className="prev">이전 페이지</Link>
      <Link to="?board_no=8&amp;page=1" className="current">1</Link>
      <Link to="?board_no=8&amp;page=2" className="other">2</Link>
      <Link to="?board_no=8&amp;page=2" className="next">다음 페이지</Link>
    </div>
  )
}
