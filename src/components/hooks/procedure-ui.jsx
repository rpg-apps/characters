import { useState } from 'react'
import mapObject from 'map-obj'
import Input from '../presentation/input'

const STATUS = {
  OUTPUT: 'output',
  INPUT: 'input',
  CHOOSE: 'choose',
  EDIT: 'edit'
}

export function useProdcedureUI (character) {
  const [state, setState] = useState({ status: undefined, content: undefined })

  const getCharacter = () => ((character instanceof Function) ? character() : character)

  const findType = type => {
    if (type.endsWith(' array')) {
      const itemType = type.substring(0, type.length - ' array'.length)
      return [findType(itemType)]
    }
    const complexTypeSubtypes = getCharacter().playbook.rules.types.find(t => (t.name === type) && t.fieldTypes)?.fieldTypes
    if (!complexTypeSubtypes) return type
    return mapObject(complexTypeSubtypes, (key, subtype) => [key, findType(subtype.name || subtype)])
  }

  const output = async (title, text) => {
    setState({
      status: STATUS.OUTPUT,
      content: <div className='ui'>
      <div className='title'>{title}</div>
      <div className='content'>{text}</div>
    </div>
    })
  }

  const input = (title, type = 'text', { status, initialValue }) => {
    return new Promise(resolve => {
      type = findType(type) || type

      const update = value => {
        const save = async () => {
          await resolve(value)
          await getCharacter().save()
          exit()
        }

        setState({
          status: status || STATUS.INPUT,
          content: <div className='ui'>
            <Input key='input' type={type} value={value} onChange={update} />
            <div key='submit' className='primary button' onClick={save}>done</div>
          </div>
        })
      }

      update(initialValue)
    })
  }

  const choose = (title, options) => {
    const count = 2
    return new Promise(resolve => {

      const update = (value = [], option) => {
        value = (() => {
          if (option === undefined)  return value
          if (value.includes(option)) {
            value.splice(value.indexOf(option), 1)
          } else {
            value = value.concat([option])
          }
          return value
        }) ()
        const maxedOut = value.length === count

        const save = async () => {
          await resolve(value)
          await getCharacter().save()
          exit()
        }

        setState({
          status: STATUS.CHOOSE,
          content: <div className='ui'>
            <div className={`options ${maxedOut ? 'maxed-out' : ''}`}>
            </div>
            <div key='submit' className='primary button' onClick={save}>done</div>
          </div>
        })
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
    setState({ status: undefined, content: undefined })
  }

  const ui = Object.assign({ output, input, choose, edit }, state)

  return ui
}
