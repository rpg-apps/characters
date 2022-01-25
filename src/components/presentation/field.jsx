import React from 'react'
import { useSwipeable } from 'react-swipeable'

export default function Field (props) {
  const { handleEvent, className, name, value, children } = props
  const swipeHandlers = useSwipeable({
    onSwiped: e => handleEvent(props, { ...e, action: 'swiped' }),
    onSwiping: e => handleEvent(props, { ...e, action: 'swiping' })
  })

  if(value === undefined || ((typeof value === 'number') && isNaN(value))) {
    console.warn(`bad value for field ${name}: ${value}`)
    return <div className='bad field' name={name}></div>
  }

  if (Array.isArray(value)) {
    <Field key={name} name={name} className={`complex ${className || ''}`} handleEvent={handleEvent}>
      {value.map((item, index) => <Field key={index} name={index} value={item} handleEvent={handleEvent} />)}
    </Field>
  }

  if (typeof value === 'object') {
    return <Field key={name} name={name} value={'array'} className={`complex ${className || ''}`} handleEvent={handleEvent}>
      {Object.entries(value).map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={handleEvent} />)}
    </Field>
  }

  const eventHandling = { onClick: e => handleEvent(props, e) }
  if (!props.noSwipe) { Object.assign(eventHandling, swipeHandlers) }
  if (!props.noDirect) { Object.assign(eventHandling, { onMouseUp: e => handleEvent(props, e), onMouseDown: e => handleEvent(props, e) }) }
  return <div name={name} value={value} {...eventHandling} className={className ? `${className} field` : 'field'}>{children}</div>
}
