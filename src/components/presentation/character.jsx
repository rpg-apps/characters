import React from 'react'

import Field from './field'

export default function Character ({ character, children, handleEvent=()=>{} }) {
  const fields = () => {
    return []
      .concat(Object.entries(character.fields))
      .concat([['playbook', Object.assign({ name: character.playbook.name }, character.playbook.fields)]])
      .concat([['notes', character.notes]])
  }

  return <div className={`character ${character.playbook.name} ${character.rulebooks.map(rb => rb.replace(' ', '-')).join(' ')}`}>
    {fields().map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={handleEvent} />)}
    {children}
  </div>
}
