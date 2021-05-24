import React from 'react'

export default function CharacterProgress(props) {
  return <div className='character-progress'>
    <div className='level'>{props.level}</div>
    <div className='xp'>{props.xp}</div>
  </div>
}

// TODO: Elaborate each to a component