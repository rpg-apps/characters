import React from 'react'

export default function CharacterTitle(props) {
  return <div className='character-title'>
    <div className='name'>{props.name}</div>
    <div className='adventure'>{props.adventure}</div>
    <div className='classifications'>{props.alignment} {props.race} {props.characterClass}</div>
  </div>
}

// TODO: Elaborate each to a component