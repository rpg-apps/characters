import React from 'react'

export default function CharacterStatus(props) {
  return <div className='character-status'>
  	<div className='level'>{props.level}</div>
    <div className='xp'>{props.xp}</div>
    <div className='armor'>{props.armor}</div>
    <div className='hit-points'>{props.hitPoints}</div>
    <div className='damage'>{props.damage}</div>
    <div className='bonds'>{props.bonds}</div>
  </div>
}

// TODO: Elaborate each to a component