import { useState } from 'react'
import { Uncalculated } from '../../../presentation/character'
import { Selection } from '../../../presentation/character/selection'

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

  const selected = option => selection.source === option || selection.target === option
  const used = option => Object.keys(value || {}).includes(option) || Object.values(value || {}).includes(option)

  const handle = option => {
    if (used(option)) {
      unassign(option)
    } else {
      select(option)
    }
  }

  return <div className='assignment'>
    <Selection.Uncalculated className='source' options={source} selected={selected} classes={option => used(option) ? 'used' : ''} select={handle} />
    <Selection.Uncalculated className='target' options={target} selected={selected} classes={option => used(option) ? 'used' : ''} select={handle} />
  </div>
}
