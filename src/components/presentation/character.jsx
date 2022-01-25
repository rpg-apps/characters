import React from 'react'

import Field from './field'

export default function Character ({ character, children, handleEvent=()=>{} }) {
  const fields = () => {
    return []
      .concat(Object.entries(character.fields))
      .concat(Object.entries(character.playbookFields))
      .concat([['playbook', character.playbook.name]])
      .concat([['notes', character.notes]])
  }

  return <div className={`character ${character.playbook.name} ${character.rulebooks.map(rb => rb.replace(' ', '-')).join(' ')}`}>
    {fields().map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={handleEvent} />)}
    {children}
  </div>
}
