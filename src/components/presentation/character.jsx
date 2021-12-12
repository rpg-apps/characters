import React from 'react'
import Field from './field'

export function Character ({ character }) {
  const fields = []
    .concat(Object.entries(character.fields))
    .concat([['playbook', Object.assign({ name: character.playbook.name }, character.playbook.fields)]])
  return <div className={`character ${character.playbook.name} ${character.rulebooks.map(rb => rb.replace(' ', '-')).join(' ')}`}>
    {fields.map(renderField)}
  </div>
}

function renderField ([key, value]) {
  if (typeof value === 'object') {
    return <Field key={key} name={key} className='complex'>
      {Object.entries(value).map(renderField)}
    </Field>
  }
  return <Field key={key} name={key} value={value} />
}
