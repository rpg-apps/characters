import { useState } from 'react'

import Field from '../presentation/field'
import Input from '../presentation/input'

const STATUS = {
  OUTPUT: 'output',
  INPUT: 'input',
  CHOOSE: 'choose',
  EDIT: 'edit'
}

export function useProdcedureUI (character) {
  const [status, setStatus] = useState(undefined)
  const [content, setContent] = useState(undefined)

  const getCharacter = () => ((character instanceof Function) ? character() : character)

  const findType = type => {
    if (type.endsWith(' array')) {
      const itemType = type.substring(0, type.length - ' array'.length)
      return [findType(itemType)]
    }
    const complexTypeSubtypes = getCharacter().playbook.rules.types.find(t => (t.name === type) && t.fieldTypes)?.fieldTypes
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

  const input = (title, type = 'text', { status, initialValue }) => {
    return new Promise(resolve => {
      setStatus(status || STATUS.INPUT)
      type = findType(type) || type

      const update = value => {
        const save = async () => {
          await resolve(value)
          await getCharacter().save()
          exit()
        }

        setContent(<div className='ui'>
          <Input key='input' type={type} value={value} onChange={update} />
          <div key='submit' className='primary button' onClick={save}>done</div>
        </div>)
      }

      update(initialValue)
    })
  }

  const choose = (title, options, count = 1) => {
    return new Promise(resolve => {
      setStatus(STATUS.CHOOSE)


      const update = value => {
        const save = async () => {
          await resolve(value)
          await getCharacter().save()
          exit()
        }

        setContent(<div className='ui'>
        <div className='options'>
          {options.map((option, index) =>
            <Field key={index} name={index} className={`option ${value === option ? 'selected' : ''}`} value={option} handleEvent={() => update(option)} />)}
        </div>
        <div key='submit' className='primary button' onClick={save}>done</div>
      </div>)
      }

      update()
    })
  }

  const edit = async (fieldName, type) => {
    const initialValue = await getCharacter().get(fieldName, { ui })
    const result = await input(fieldName, type, { status: STATUS.EDIT, initialValue })
    await getCharacter().set(fieldName, result)
  }

  const exit = () => {
    setStatus(undefined)
    setContent(undefined)
  }

  const ui = { status, output, input, choose, edit, content }

  return ui
}
