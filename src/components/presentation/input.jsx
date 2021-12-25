import React from 'react'

export default function Input ({ text, type, afterInput }) {
  const InputType = InputTypes[type]
  return <InputType text={text} afterInput={afterInput} />
}

function BooleanInput ({ text, afterInput }) {
  return <label className='checkbox'>
    <input type='checkbox' onChange={(e, checked) => afterInput(checked)} />
    {text}
  </label>
}


const InputTypes = {
  boolean: BooleanInput
}
