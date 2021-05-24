import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterInfo (props) {
  return <div className='character-info'>
    <div className='look'>
      <div className='key'>Look: </div>
      <div className='value'>{props.look}</div>
    </div>
    <div className='bio'>
      <div className='key'>Bio: </div>
      <div className='value'>{props.bio}</div>
    </div>
    <Link className='bonds' to={`/character/${props.name}/bonds`}>Bonds</Link>
  </div>
}

// TODO: Elaborate to components wherever needed