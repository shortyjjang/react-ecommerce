import React from 'react'
export default function InputNumber(props) {
  const num = Number(props.number), minNum = props.min ? Number(props.min) : 0, maxNum = props.max ? Number(props.max) : '';
  return (
    <span className="input-number">
      {props.max ? <input type="text" min={minNum} max={maxNum} value={num} 
        onKeyDown={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} 
        onChange={(e) => {if(e.key !== 'Process') props.updateNum(e.target.value)}} 
      /> : <input type="text" min={minNum} value={num} 
        onKeyDown={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} 
        onChange={(e) => {if(e.key !== 'Process') props.updateNum(e.target.value)}} 
      />}
      <button className="minus" disabled={num < 2} 
        onClick={() => {if(num > minNum) props.updateNum(num - 1)}}
      >-</button>
      <button className="plus" 
        onClick={() => props.updateNum(num + 1)}
      >+</button>
    </span>
  )
}
