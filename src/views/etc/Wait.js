import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { showTopCopy, setShowMember } from '../../_actions/shop_actions';

export default function Wait() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showTopCopy(false))
    dispatch(setShowMember(null))
  }, [])
  return (
    <div className="waitsite">
      <p>2022년 4월 22일 오후 10시부터 23일 오전 8시까지 사이트 점검 예정입니다</p>
    </div>
  )
}
