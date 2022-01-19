import React from 'react'

export default function Input ({ text, value, type, onChange }) {
  const InputType = InputTypes[type]
  return <InputType text={text} value={value} onChange={onChange} />
}

Input.Controlled = function ControlletInput ({ text='', type='text', control }) {
  return <Input type={type} text={text} value={control[0]} onChange={control[1]} />
}

function BooleanInput ({ text, value, onChange }) {
  return <label className='checkbox'>
    <input type='checkbox' chceked={value} onChange={(e, checked) => onChange(checked)} />
    {text}
  </label>
}

function TextInput ({ text, value, onChange }) {
  return <div className='text input'>
    <label>{text}</label>
    <input type='text' value={value} onChange={e => onChange(e.target.value)} />
  </div>
}

function LongTextInput ({ text, value, onChange }) {
  return <div className='text input'>
    <label>{text}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} />
  </div>
}


const InputTypes = {
  boolean: BooleanInput,
  text: TextInput,
  'long text': LongTextInput
}
