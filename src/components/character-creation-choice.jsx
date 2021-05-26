import React from 'react'

export default function CharacterCollectionsChoice(props) {
  const content = (() => {
    if (props.options) {
      console.log(props.options)
      return props.options.map((option, index) => <div key={index} className={`${option.title} choice`} onClick={() => props.set(option)}>
      	<div className='title'>{option.title}</div>
        {option.subtitle ? <div className='subtitle'>{option.subtitle}</div> : ''}
      	{option.text ? <div className='content'>
          {option.text.split('\\n').map((line, key) => <div key={key}>{line}</div>)}
        </div> : ''}
      </div>)
    }
    return JSON.stringify(props)
  }) ()

  return <div className={`${props.name} choice`}>
    {content}
  </div>
}
