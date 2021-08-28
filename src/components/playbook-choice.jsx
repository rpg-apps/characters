import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useSwipeable } from 'react-swipeable'

export default function (props) {
  const [about, setAbout] = useState(undefined)
  const playbooks = props.rulebook.playbooks

  const toggleAbout = newAbout => {
    setAbout((about === newAbout) ? undefined : newAbout)
  }

  return <SwipeableViews enableMouseEvents>
    <div id='index' className='index playbook'>
      <div>Slide right to see the optional playbooks.</div>
      <div>Slide up to select a playbook.</div>
      <div>Touch the introduction at the bottom part of the playbook to read it.</div>
    </div>
    {playbooks.map(playbook => <div key={playbook.name}
      className={`playbook ${playbook.name} ${about === playbook.name ? 'showing-about' : 'hidden-about'}`}
      {...useSwipeable({ onSwipedUp: () => props.set(playbook) })}>
      <div className='title'>{playbook.name}</div>
      <div className='subtitle'>{playbook.fields['in a sentence']}</div>
      <div className='about text' onClick={() => this.toggleAbout(playbook.name)}>
        {playbook.fields.introduction.split('\\n').map((line, key) => <div key={key}>{line}</div>)}
      </div>
    </div>)}
  </SwipeableViews>
}
