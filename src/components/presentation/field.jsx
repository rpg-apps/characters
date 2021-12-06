import React from 'react'

export default function Field (props) {
  return <div {...props} className={props.className ? `${props.className} field` : 'field'} />
}
