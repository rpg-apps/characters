import React from 'react'

import Stat from './stat'

export default function Stats (props) {
  return <div className='stats'>
    {props.stats.map(stat => (<Stat {...stat} key={stat.name}/>))}
  </div>
}