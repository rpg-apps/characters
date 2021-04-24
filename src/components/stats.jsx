import React from 'react'

import Stat from './components/stat'

export default function Stats (props) {
  return <div className='stats'>
    {props.stats.map(stat => <Stat className={stat.name}/>}
  </div>
}