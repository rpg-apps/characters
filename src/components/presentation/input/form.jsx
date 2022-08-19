import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Input from './index'

// Input with a title and a submit button
export default function Form ({ id, title, type, submit, submitClass, submitText }) {
  const [value, setValue] = useState()

  return <form id={id}>
    <div className='title'>{title}</div>
    <Input value={value} type={type} onChange={(data) => setValue(data)} />
    <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
      <Button variant='contained' className={submitClass} onClick={() => submit(value)}>{submitText || title}</Button>
    </Box>
  </form>
}
