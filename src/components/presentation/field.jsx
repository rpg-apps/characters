import React from 'react'
import { useSwipeable } from 'react-swipeable'

export default function Field (props) {
  const { handleEvent, className, name, value, children } = props
  const swipeHandlers = useSwipeable({
    onSwiped: e => handleEvent(props, { ...e, action: 'swiped' }),
    onSwiping: e => handleEvent(props, { ...e, action: 'swiping' })
  })

  if (typeof value === 'object') {
    return <Field key={name} name={name} className='complex' handleEvent={handleEvent}>
      {Object.entries(value).map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={handleEvent} />)}
    </Field>
  }

  const eventHandling = { onClick: e => handleEvent(props, e) }
  if (!props.noSwipe) { Object.assign(eventHandling, swipeHandlers) }
  if (!props.noDirect) { Object.assign(eventHandling, { onMouseUp: e => handleEvent(props, e), onMouseDown: e => handleEvent(props, e) }) }
  return <div name={name} value={value} {...eventHandling} className={className ? `${className} field` : 'field'}>{children}</div>
}
