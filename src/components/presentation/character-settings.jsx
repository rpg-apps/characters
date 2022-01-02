import React, { useState } from 'react'
import Modal from 'react-modal'
import { FaRegSun } from 'react-icons/fa'

import Input from './input'

Modal.setAppElement('#root')

export default function CharacterSettings ({ settings, value, onChange }) {
  const [showing, setShowing] = useState(false)
  const toggle = () => setShowing(!showing)

  return <div className='settings'>
    <FaRegSun onClick={toggle} />
    <Modal isOpen={showing} onRequestClose={toggle}>
      {Object.entries(settings).map(([groupTitle, groupSettings]) => <div key={groupTitle} className='group'>
          <div className='group-title'>{groupTitle}</div>
          {Object.entries(groupSettings).map(([settingTitle, { text, type }]) => <div key={settingTitle} className='setting'>
            <Input text={text} type={type} afterInput={settingValue => {
              value[groupTitle] = value[groupTitle] || {}
              value[groupTitle][settingTitle] = settingValue
              onChange()
            }} />
          </div>)}
        </div>)}
    </Modal>
  </div>
}
