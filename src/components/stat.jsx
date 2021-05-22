import React from 'react'

export default function Stat (props) {
  return <div className={`stat ${props.name}`}>
    <div className='name'>{props.name.substring(0,3)}</div>
    <div className='value'>{props.value}</div>
    <div className='modifier'>{props.modifier}</div>
    <div className='debility'>{props.debility}</div>
  </div>
}
// TODO: calculate modifier by value using Idan's stat module (in the logic, not here)