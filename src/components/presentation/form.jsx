import React, { useState } from 'react'

import Input from './input'

export default function Form ({ id, title, submit, submitClass, submitText, fields }) {
  const [data, setData] = useState({})

  return <form id={id}>
    <div className='title'>{title}</div>
    {fields.map(field => <Input text={`${field.title || field.name || field}:`} value={data[field.name || field]} type={field.type || 'text'} onChange={e => setData({ ...data, [field.name || field]: e.target.value })} />)}
    <div className={`${submitClass} button`} onClick={() => submit(data)}>{submitText || title}</div>
  </form>
}
