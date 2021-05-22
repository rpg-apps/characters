import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterCollections(props) {
  return <div className='character-collections'>
    <Link className='gear' to={`/character/${props.name}/gear`}>Gear</Link>
    <Link className='moves' to={`/character/${props.name}/moves`}>Moves</Link>
  </div>
}

// TODO: Elaborate each to a component