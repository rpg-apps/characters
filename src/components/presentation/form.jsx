import React, { useState } from 'react'

export default function Form ({ id, title, submit, submitClass, submitText, fields }) {
  const [data, setData] = useState({})

  return <form id={id}>
    <div className='title'>{title}</div>
    {fields.map(field => <label>
      {field.title || field.name || field}:
      <input type={field.type || 'text'} onChange={e => setData({ ...data, [field.name || field]: e.target.value })} />
    </label>)}
    <div className={`${submitClass} button`} onClick={() => submit(data)}>{submitText || title}</div>
  </form>
}
