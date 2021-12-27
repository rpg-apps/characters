import React, { useState } from 'react'

import '../../css/pages/new.scss'

import { useRules } from '../contexts/rules-context'

import Field from '../presentation/field'
import { SUPPORTED_RULEBOOKS } from '../../games'

export default function New () {
  const rules = useRules()

  return <div className='new page'>
    <WithChoice title='choose game' options={SUPPORTED_RULEBOOKS} after={async rulebook => await rules.get([rulebook])}>{rules => {
      return <div className={`rules ${rules.rulebooks.join(' ')}`}>
        <WithChoice title='playbook' options={rules.characters.builder.playbookOptions()} after={name => rules.characters.builder.start(name)}>{() => {
          const ChoiceComponent = Choices[rules.characters.builder.choice.constructor.name]
          return <ChoiceComponent builder={rules.characters.builder} />
        }}</WithChoice>
      </div>
    }
    }</WithChoice>
  </div>
}

function WithChoice ({ title, options, children, after }) {
  const [value, setValue] = useState()

  const set = async option => {
    const val = after ? (await after(option)) : option
    setValue(val)
  }

  if (!value) {
    if (options.length === 1) {
      set(options[0])
    }
    return <div className={`pre-choice ${title}`}>
      <div className='title'>{title}</div>
      <div className='options'>
        {options.map(option => <Field key={option} className={value === option ? 'selected' : ''} value={option} onClick={async () => await set(option)}/>)}
      </div>
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
