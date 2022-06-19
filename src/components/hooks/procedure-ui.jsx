import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

import Field from '../presentation/field'

const STATUS = {
  OUTPUT: 'output',
  INPUT: 'input',
  CHOOSE: 'choose',
  EDIT: 'edit'
}

export function useProdcedureUI (character) {
  const [status, setStatus] = useState(undefined)
  const [value, setValue] = useState('')
  const [content, setContent] = useState(undefined)

  const findType = type => {
    if (type.endsWith(' array')) {
      const itemType = type.substring(0, type.length - ' array'.length)
      return [findType(itemType)]
    }
    const complexTypeSubtypes = character.playbook.rules.types.find(t => (t.name === type) && t.fieldTypes)?.fieldTypes
    if (!complexTypeSubtypes) return type
    return Object.entries(complexTypeSubtypes)
      .reduce((all, [key, subtype]) => ({ ...all, [key]: findType(subtype.name || subtype) }), {})
  }

  const output = async (title, text) => {
    setStatus(STATUS.OUTPUT)
    setContent(<div className='ui'>
      <div className='title'>{title}</div>
      <div className='content'>{text}</div>
    </div>)
  }

  const input = (title, type = 'text', status = STATUS.INPUT) => {
    return new Promise(resolve => {
      type = findType(type) || type
      const save = async () => {
        await resolve(value)
        await character.save()
        exit()
      }
      setContent(<div className='ui'>
        <Input key='input' type={type} value={value} onChange={setValue} />
        <div key='submit' className='primary button' onClick={save}>done</div>
      </div>)
    })
  }

  const choose = (title, options, count = 1) => {
    return new Promise(resolve => {
      const save = async () => {
        await resolve(value)
        await character.save()
        exit()
      }
      setContent(<div className='ui'>
        <div className='options'>
          {options.map((option, index) => <Field key={index} name={index} className='option' value={option} handleEvent={() => setvalue(option)} />)}
        </div>
        <div key='submit' className='primary button' onClick={save}>done</div>
      </div>)
    })
  }

  const edit = async (fieldName, type) => {
    setValue(await character.get(fieldName, { ui }))
    const result = await input(fieldName, type, STATUS.EDIT)
    await character.set(fieldName, result)
  }

  const exit = () => {
    setStatus(undefined)
    setValue('')
    setContent('')
  }

  const ui = { status, output, input, choose, edit, content }

  return ui
}
