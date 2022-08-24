import { useState } from 'react'
import { Uncalculated } from '../../../presentation/character'

export default function AssignmentChoice ({ builder, choice, control }) {
  const [value, setValue] = control
  const [selection, setSelection] = useState({})

  const source = builder.playbook.fields[choice.source]
  const target = choice.target

  const assign = newSelection => {
    setValue({ ...(value || {}), [newSelection.target]: newSelection.source })
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

  const selected = option => Object.keys(value || {}).includes(option) || Object.values(value || {}).includes(option)

  const handle = option => {
    if (selected(option)) {
      unassign(option)
    } else {
      select(option)
    }
  }

  return <div className='selection'>
    <div className='source'>
      {source.map((option, index) => <div key={index} className={`${selected(option) ? 'selected' : ''} source`} onClick={() => handle(option)}><Uncalculated value={option} /></div>)}
    </div>
    <div className='target'>
      {target.map((option, index) => <div key={index} className={`${selected(option) ? 'selected' : ''} target`} onClick={() => handle(option)}><Uncalculated value={option} /></div>)}
    </div>
  </div>
}

AssignmentChoice.initialValue = {}
