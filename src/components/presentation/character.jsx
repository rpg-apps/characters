import React from 'react'

import Field from './field'

export default function Character ({ character, children, handleEvent=()=>{} }) {
  const fields = () => {
    return []
      .concat(Object.entries(character.fields))
      .concat(Object.entries(character.playbookFields))
      .concat([['playbook', character.playbook.name], ['modifiers', character.modifiers]])
      .sort(([key1], [key2]) => {
        if (key1 < key2) return -1
        if (key1 > key2) return 1
        return 0
      })
  }

  return <div className={`character ${Character.classes(character)}`}>
    {fields().map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={handleEvent} />)}
    {children}
  </div>
}

Character.classes = character => `${character.playbook.name} ${character.rulebooks.map(rb => rb.replace(' ', '-')).join(' ')}`
