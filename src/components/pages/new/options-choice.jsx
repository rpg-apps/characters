import React from 'react'

import Field from '../../presentation/field'

export default function OptionsChoice ({ title, options, onChoice }) {
  if (options.length === 1) {
    onChoice(options[0])
    return ''
  }
  return [
    <div key='title' className='title'>{title}</div>,
    <div key='options' className='options'>
      {options.map((option, index) => <Field key={index} value={option} handleEvent={async () => await onChoice(option)}/>)}
    </div>
  ]
}
