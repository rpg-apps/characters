import React from 'react'

export default function CharacterInfo (props) {
  return <div className='character-info'>
  	<div className='active'>{props.active}</div>
    <div className='adventure'>{props.adventure}</div>
    <div className='name'>{props.name}</div>
    <div className='race'>{props.race}</div>
    <div className='class'>{props.class}</div>
    <div className='bio'>{props.bio}</div>
    <div className='look'>{props.look}</div>
    <div className='alignment'>{props.alignment}</div>
  </div>
}

// TODO: Elaborate to components wherever needed