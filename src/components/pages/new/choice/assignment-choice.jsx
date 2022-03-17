import React, { useState } from 'react'
import Field from '../../../presentation/field'

export default function AssignmentChoice ({ builder, choice, onChoice, control }) {
  const [value, setValue] = control
  const [selection, setSelection] = useState({})

  const source = builder.playbook.fields[choice.source]
  const target = choice.target

  const assign = newSelection => {
    setValue({ ...value, [newSelection.target]: newSelection.source })
    setSelection({})
  }

  const unassign = unassigned => {
    let key
    if (source.includes(unassigned)) key = target.find(targetKey => value[targetKey] === unassigned)
    if (target.includes(unassigned)) key = unassigned

    const newValue = value
    delete value[key]
    setValue(newValue)
    setSelection({})
  }

  const select = selectionAddition => {
    let addition = { }
    if (source.includes(selectionAddition)) addition = { source: selectionAddition }
    if (target.includes(selectionAddition)) addition = { target: selectionAddition }

    const newSelection = { ...selection, ...addition }
    if (newSelection.source && newSelection.target) assign(newSelection)
    else                                            setSelection(newSelection)
  }

  const handle = item => {
    if (Object.keys(value).includes(item) || Object.values(value).includes(item)) {
      unassign(item)
    } else {
      select(item)
    }
  }

  return <div className='selection'>
    <div className='source'>
      {source.map((sourceValue, index) => <Field className={`recommendation ${selection.source === sourceValue ? 'selected' : ''} ${Object.values(value).includes(sourceValue) ? 'done' : ''}`}
        key={index} value={sourceValue} handleEvent={() => handle(sourceValue)}/>)}
    </div>
    <div className='target'>
      {target.map((targetValue, index) => <Field className={`recommendation ${selection.target === targetValue ? 'selected' : ''} ${Object.keys(value).includes(targetValue) ? 'done' : ''}`}
        key={index} name={targetValue} value={value[targetValue] || ''} handleEvent={() => handle(targetValue)} />)}
    </div>
  </div>
}

AssignmentChoice.initialValue = {}
