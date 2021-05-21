import React from 'react'

export default function CharacterInfo (props) {
  return <div className='character-info'>
    <div className='race'>
      <div className='key'>Race: </div>
      <div className='value'>{props.race}</div>
    </div>
    <div className='character-class'>
      <div className='key'>Class: </div>
      <div className='value'>{props.characterClass}</div>
    </div>
    <div className='alignment'>
      <div className='key'>Alignment: </div>
      <div className='value'>{props.alignment}</div>
    </div>
    <div className='look'>
      <div className='key'>Look: </div>
      <div className='value'>{props.look}</div>
    </div>
    <div className='bio'>
      <div className='key'>Bio: </div>
      <div className='value'>{props.bio}</div>
    </div>
  </div>
}

// TODO: Elaborate to components wherever needed