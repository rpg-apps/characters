import { useState } from 'react'
import mapObject from 'map-obj'

import Input from '../presentation/input'
import Title from '../presentation/title'
import { Selection } from '../presentation/character/selection'

const STATUS = {
  OUTPUT: 'output',
  INPUT: 'input',
  CHOOSE: 'choose',
  EDIT: 'edit'
}

export function useProdcedureUI (character) {
  const [state, setState] = useState({ })

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

  const output = async (title, content) => {
    setState({
      status: STATUS.OUTPUT,
      content: <div className='procedure-ui'>
      <Title title={title} />
      <div className='content'>{content}</div>
    </div>
    })
  }

  const input = (title, type = 'text', { status, initialValue }) => {
    return new Promise(resolve => {
      type = findType(type) || type

      const update = value => setState({
        resolve,
        value,
        canFinish: Boolean(value),
        status: status || STATUS.INPUT,
        content: <div className='procedure-ui'>
          <Input type={type} value={value} onChange={update} />
        </div>
      })

      update(initialValue)
    })
  }

  const choose = (title, options, count) => {
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

        const selected = option => value.includes(option)
        const disabled = option => maxedOut && !selected(option)

        setState({
          resolve,
          value,
          canFinish: maxedOut,
          status: STATUS.CHOOSE,
          content: <Selection.Uncalculated className='procedure-ui' title={title} options={options} selected={selected} disabled={disabled} select={option => update(value, option)} />
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

  const save = async () => {
    if (!state.resolve) throw new Error('This should not happen...')
    await state.resolve(state.value)
    await getCharacter().save()
  }

  const finish = async shouldSave => {
    if (shouldSave) await save()
    setState({ })
  }

  const ui = Object.assign({ output, input, choose, edit, finish }, state)
  return ui
}
