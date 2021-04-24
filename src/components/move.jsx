import React from 'react'

export default function Move (props) {
  return <div className={`move ${props.name}`}>
  	<div className='name'>{props.name}</div>
  </div>
}

// TODO: Add divs according to Idan's move module, icon, labels