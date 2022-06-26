import React, { useState } from 'react'

import Input from './input'

export default function Form ({ id, title, type, submit, submitClass, submitText }) {
  const [data, setData] = useState(defaultData(type))

  return <form id={id}>
    <div className='title'>{title}</div>
    <Input value={data} type={type} onChange={({ data }) => setData(data)} />
    <div className={`${submitClass} button`} onClick={() => submit(data)}>{submitText || title}</div>
  </form>
}

function defaultData (type) {
  if (type.constructor === String)  return Input.Defaults[type]
  return Object.entries(type).reduce((val, [field, type]) => ({ ...val, [field]: defaultData(type) }), { })
}


