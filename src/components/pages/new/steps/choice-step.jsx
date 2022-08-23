import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import TypeChoice from '../choice/type-choice'
import FieldChoice from '../choice/field-choice'
import AssignmentChoice from '../choice/assignment-choice'

const choices = { TypeChoice, FieldChoice, AssignmentChoice }

export default forwardRef(function GameStep ({ value: builder, update }, ref) {
  const [value, setValue] = useState()
  const history = useHistory()
  const choice = builder.choice
  const ChoiceComponent = choices[choice.constructor.name]

  useEffect(update, [value])

  useImperativeHandle(ref, () => ({
    canBack: true,
    canNext: Boolean(value),
    next: () => {
      builder.choose(value)
      setValue(undefined)
      return builder
    },
    back: () => { }
  }))

  return <div className={`choice step ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    <ChoiceComponent choice={choice} builder={builder} control={[value, setValue]} />
  </div>
})
