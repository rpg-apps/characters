import React, { useState } from 'react'

import Field from '../presentation/field'
import { supportedRulebooks, getRules } from '../../logic/rules'

export default function New () {
  <WithChoice options={supportedRulebooks()} after={getRules}>{rules =>
    <WithChoice options={rules.characters.builder.playbooks} after={name => rules.characters.builder.start(name)}>{() => {
      const ChoiceComponent = Choices[rules.characters.builder.choice.constructor.name]
      return <ChoiceComponent builder={rules.characters.builder} />
    }}</WithChoice>
  }</WithChoice>
}

function WithChoice ({ options, children, after }) {
  const [value, setValue] = useState()

  const set = async option => {
    const val = after ? (await after(option)) : option
    setValue(val)
  }

  if (!value) {
    return <div className='pre-choice'>
      {options.map(option => <Field className={value === option ? 'selected' : ''} {...option} onClick={async () => await set(option)}/>)}
    </div>
  }

  return children(value)
}

function TypeChoice ({ builder }) {
  const [value, setValue] = useState()

  const input = (() => {
    if (builder.choice.type === 'long text')
      return <textarea value={value} onChange={setValue} />
    else
      return <input type={builder.choice.type} value={value} onChange={setValue} />
  })()

  return <div className={`field choice ${builder.choice.name}`}>
    {input}
   {/* TODO reccomendations */}
    <button className='submit' onClick={builder.choose(value)} value='submit' />
  </div>
}

function FieldChoice ({ builder }) {
  const [value, setValue] = useState()
  const options = builder.playbook

  return <div className={`field choice ${builder.choice.name}`}>
    {options.map(option => <Field className={value === option ? 'selected' : ''} {...option} onClick={() => setValue(option)}/>)}
    <button className='submit' onClick={builder.choose(value)} value='submit' />
  </div>
}

function AssignmentChoice ({ builder }) {
}

const Choices = { TypeChoice, FieldChoice, AssignmentChoice }
