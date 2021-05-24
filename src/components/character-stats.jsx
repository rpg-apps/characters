import React from 'react'

import Stat from './stat'

export default function CharacterStats (props) {
  return <div className='character-stats'>
    {props.stats.map(stat => (<Stat {...stat} key={stat.name}/>))}
  </div>
}