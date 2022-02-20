import React from 'react'

export default function Input ({ text, value, type, onChange }) {
  if (type.endsWith(' array')) {
    const itemType = type.substring(0, type.length - ' array'.length)
    return <ArrayInput {...{ text, value, itemType, onChange }} />
  }

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

function ArrayInput ({ text, value, itemType, onChange }) {
  const itemChange = index => (newItem => {
    value[index] = newItem
    return onChange(value)
  })

  const itemDelete = index => () => {
    value.splice(index, 1)
    return onChange(value)
  }

  const itemAdd = () => {
    // TODO add item generation based on type
    return onChange(value)
  }

  return <div className='array input'>
    <label>{text}</label>
    <div className='items'>
      {value.map((item, index) => <div className='item'>
        <Input value={item} type={itemType} onChange={itemChange(index)} text=''/>
        <div className='delete' onClick={itemDelete(index)} />
      </div>)}
      <div className='add' onClick={itemAdd} />
    </div>
  </div>
}


const InputTypes = {
  boolean: BooleanInput,
  text: TextInput,
  'long text': LongTextInput
}
