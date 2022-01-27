import React from 'react'

export default function Plan ({ selected, name, description, children='', onClick }) {
  return <div className={`plan ${name} ${selected ? 'selected' : ''}`} onClick={onClick}>
    <div className='name'>{name}</div>
    <div className='description'>{description}</div>
    {children}
  </div>
}
