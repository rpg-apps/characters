import React, { useState } from 'react'
import { noCase } from 'change-case'

import TypeChoice from './type-choice'
import FieldChoice from './field-choice'
import AssignmentChoice from './assignment-choice'

import ChoiceSubmit from '../choice-submit'

const choices = { TypeChoice, FieldChoice, AssignmentChoice }

export default function Choice ({ choice, builder, onChoice }) {
  const [value, setValue] = useState(choices[choice.constructor.name].initialValue)
  const ChoiceComponent = choices[choice.constructor.name]

  const submit = () => {
    onChoice(value)
    setValue('')
  }

  return <div className={`${choice.name} ${noCase(choice.constructor.name)}`}>
    <div className='title'>{choice.name}</div>
    <ChoiceComponent choice={choice} builder={builder} control={[value, setValue]} />
    <ChoiceSubmit builder={builder} onClick={submit} />
  </div>
}
