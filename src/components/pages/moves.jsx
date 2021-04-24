import React from 'react'

import Move from '../move'

export default function Moves (props) {
  return <div className='moves'>
  	{props.moves.map(move => (<Move {...move} key={move.name}/>))}
  </div>
}