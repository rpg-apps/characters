import React, { useState } from 'react'

import EventManager from './event-manager'

const eventManager = new EventManager()

export default function Field (props) {
  const { handleEvent, className, name, value, children } = props

  if(value === undefined || ((typeof value === 'number') && isNaN(value))) {
    return <div className='bad field' name={name}></div>
  }

  if (Array.isArray(value)) {
    return <Field key={name} name={name} value='array' className={`array ${className || ''}`} handleEvent={handleEvent}>
      <Field name='length' value={value.length} handleEvent={handleEvent} />
      {value.map((item, index) => <Field key={index} name={`${name}.${index}`} value={item} handleEvent={handleEvent} />)}
    </Field>
  }

  if (typeof value === 'object') {
    return <Field key={name} name={name} value={'array'} className={`complex ${className || ''}`} handleEvent={handleEvent}>
      {Object.entries(value).map(([key, value]) => <Field key={key} name={`${name}.${key}`} value={value} handleEvent={handleEvent} />)}
    </Field>
  }

  return <div name={name} value={value} {...eventManager.handlers(props)} className={className ? `${className} field` : 'field'}>{children}</div>
}
