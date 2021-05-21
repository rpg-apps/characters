import React from 'react'

export default function CharacterStatus(props) {
  return <div className='character-status'>
    <div className='armor'>{props.armor}</div>
    <div className='hp'>{props.hp}</div>
    <div className='damage'>{props.damage}</div>
    <div className='bonds'>{props.bonds}</div>
  </div>
}

// TODO: Elaborate each to a component