import React from 'react'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

export default function Input ({ text='', value='', type, onChange=()=>{} }) {
  if (Array.isArray(type)) {
    return <ArrayInput {...{ text, value, itemType: type[0], onChange }} />
  }

  if (type.constructor !== String) {
    return <ComplexInput {...{ text, value, type, onChange }} />
  }

  const InputType = InputTypes[type]
  if (!InputType) {
    console.warn('unknown input type', type)
    return <div className='error input'/>
  }
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

function NumberInput ({ text, value, onChange }) {
  return <div className='number input'>
    <label>{text}</label>
    <div className='reduce' onClick={() => onChange(value - 1)}><FaMinus /></div>
    <input type='number' value={value} onChange={e => onChange(e.target.value)} />
    <div className='add' onClick={() => onChange(value + 1)}><FaPlus /></div>
  </div>
}

function ComplexInput ({ text, value, type, onChange }) {
  return <div className='complex input'>
    <label>{text}</label>
    {Object.entries(type).filter(([fieldName, fieldType]) => !IgnoredTypes.includes(fieldType)).map(([fieldName, fieldType]) =>
      <Input key={fieldName} type={fieldType} text={fieldName} value={value[fieldName]} onChange={val => onChange({ ...value, [fieldName]: val })} />
    )}
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
    value.push(generateValue(itemType))
    return onChange(value)
  }

  const generateValue = type => {
    if (Array.isArray(type)) {
      return []
    } else if (type.constructor !== String) {
      return Object.entries(itemType).reduce((result, [subfield, subtype]) => ({ ...result, [subfield]: generateValue(subtype) }), { })
    } else {
      return Defaults[type]
    }
  }

  return <div className='array input'>
    <label>{text}</label>
    <div className='items'>
      {value.map((item, index) => <div key={index} className='item'>
        <Input value={item} type={itemType} onChange={itemChange(index)} text=''/>
        <div className='delete' onClick={itemDelete(index)}><FaTrash /></div>
      </div>)}
      <div className='add' onClick={itemAdd}><FaPlus /> add</div>
    </div>
  </div>
}

const IgnoredTypes = ['procedure']

const InputTypes = {
  boolean: BooleanInput,
  text: TextInput,
  'long text': LongTextInput,
  number: NumberInput
}

const Defaults = {
  boolean: false,
  text: '',
  'long text': ''
}
