import React from 'react'

export default function OptionsChoice ({ title, options, onChoice }) {
  if (options.length === 1) {
    onChoice(options[0])
    return ''
  }

  return [
    <div key='title' className='title'>{title}</div>,
    <div key='options' className='options'>
    </div>
  ]
}
