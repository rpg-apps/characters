import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import { useCharacters } from '../../../contexts/characters-context'
import { useProdcedureUI } from '../../../hooks/procedure-ui'

import TypeChoice from '../choice/type-choice'
import FieldChoice from '../choice/field-choice'
import AssignmentChoice from '../choice/assignment-choice'

const choiceComponents = { TypeChoice, FieldChoice, AssignmentChoice }

export default forwardRef(function GameStep ({ value: builder, update, setLoading }, ref) {
  const [value, setValue] = useState()
  const history = useHistory()
  const characters = useCharacters()
  const ui = useProdcedureUI(() => builder.character)
  const choice = builder.choice
  const ChoiceComponent = choiceComponents[choice.constructor.name]

  useEffect(update, [value])

  useImperativeHandle(ref, () => ({
    canBack: true,
    canNext: Boolean(value),
    next: () => {
      builder.choose(value)
      setValue(undefined)
      return builder
    },
    back: () => { },
    finish: (builder.hasNexChoice() ? undefined : (async () => {
      await builder.finish(ui)
      setLoading(true)
      const id = await characters.create(Object.assign(builder.character.toJson(), { settings: 'manual' }))
      builder.clear()
      history.push(`/character/${id}`)
    }))
  }))

  if (ui.status)  return ui.content

  return <div className={`choice step ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    <ChoiceComponent choice={choice} builder={builder} control={[value, setValue]} />
  </div>
})
