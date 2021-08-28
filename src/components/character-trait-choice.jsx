import React, { useState } from 'react'

export default function CharacterTraitChoice (props) {
  const builder = props.characterBuilder
  const {   choice } = builder
  const [value, setValue] = useState(undefined)

  const choose = () => {
    builder.chooseCharacterTrait(choice.name, value)
    setValue(undefined)
  }

  return <div className={`${choice.name} long text choice`}>
    <div className='title'>{choice.name}</div>
    <ChoiceContent builder={builder} value={value} setValue={setValue} />
    <div className='choice button' onClick={choose}>next</div>
  </div>
}

function ChoiceContent ({ builder, value, setValue }) {
  const { choice } = builder

  if (choice.type.assignment) {
    return renderAssignmentChoice(builder, value, setValue)
  }

  if (choice.type.hasOwnProperty('from')) {
    return renderFieldChoice(builder, value, setValue)
  }

  switch (choice.type.name) {
    case 'text':  return renderTextChoice(builder, value, setValue)
    case 'long text':  return renderLongTextChoice(builder, value, setValue)
    default: return JSON.stringify(builder, value, setValue)
  }
}

function renderAssignmentChoice (builder, value, setValue) {
  const { choice } = builder
  const fieldValues = builder.playbook.fields[choice.type.from]
  const assignments = Object.keys(choice.type.assignment)

  return <div>
    <div className='assignments'>
      {assignments.map(assignment => <div className={`assignment ${assignment}`}>{assignment}</div>)}
    </div>
    <div className='values'>
      {fieldValues.map(value => <div className={`value ${value}`}>{value}</div>)}
    </div>
  </div>
}

function renderFieldChoice (builder, value, setValue) {
  const { choice } = builder
  const fieldValues = builder.playbook.fields[choice.type.from]

  const content = Array.isArray(fieldValues[0]) ? renderFieldChoicesArrayOptions(fieldValues, value, setValue) : renderSingleFieldChoiceOptions(fieldValues, value, setValue)

  return [
    choice.free ? <input type='text' value={value} name={choice.name} onChange={event => setValue(event.target.value)} /> : '',
    <div className='options'>
      {content}
    </div>
  ]
}

function renderSingleFieldChoiceOptions (options, value, setValue) {
  return options.map(option => <div className={`${value === option ? 'chosen' : ''} option button`} onClick={() => setValue(option)}>
    {optionContent(option)}
  </div>)
}

function renderFieldChoicesArrayOptions(fieldValues, value, setValue) {
  return fieldValues.map(options => {

    const toggleValue = option => {
      if (value === undefined)  return setValue(option)
      const oldArray = value.split(', ')
      const newArray = oldArray.filter(subValue => !options.includes(subValue))
      if (!oldArray.includes(option)) {
        newArray.push(option)
      }
      setValue(newArray.join(', '))
    }

    return options.map(option => <div className={`${value?.includes(option) ? 'chosen' : ''} option button`} onClick={() => toggleValue(option)}>
      {optionContent(option)}
    </div>)
  })
}

function optionContent (option) {
  if (option.constructor === Object) {
    return Object.entries(option).map(([key, value]) => <div className={key}>{value}</div>)
  }

  return option
}

function renderTextChoice (choice, value, setValue) {
  return <input type='text' value={value} name={choice.name} onChange={event => setValue(event.target.value)} />
}

function renderLongTextChoice (choice, value, setValue) {
  return <textarea name={choice.name} value={value} onChange={event => setValue(event.target.value)} />
}
