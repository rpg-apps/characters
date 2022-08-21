import { useState } from 'react'

export default function OptionsStep ({ className, title, options, Option, control }) {
  const [value, setValue] = control

  return <div className={`options step ${className}`}>
    <div className='title'>{title}</div>
    <div className='options'>
      {options.map(option => <div className='option'  className={`${value === option ? 'selected' : ''} option`} onClick={() => setValue(option)}>
        <Option option={option}/>
      </div>)}
    </div>
  </div>
}
