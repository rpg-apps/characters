import React, { useState } from 'react'

import Input from './input'

// Input with a title and a submit button
export default function Form ({ id, title, type, submit, submitClass, submitText }) {
  const [value, setValue] = useState()

  return <form id={id}>
    <div className='title'>{title}</div>
    <Input value={value} type={type} onChange={(data) => setValue(data)} />
    <div className={`${submitClass} button`} onClick={() => submit(value)}>{submitText || title}</div>
  </form>
}
