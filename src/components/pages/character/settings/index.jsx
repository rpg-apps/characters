import React, { useState } from 'react'
import Modal from 'react-modal'
import { FaRegSun } from 'react-icons/fa'

import Customization from './customization'
import DangerZone from './dangerzone'

Modal.setAppElement('#root')

export default function CharacterSettings ({ settings, value, onChange, character }) {
  const [showing, setShowing] = useState(false)
  const toggle = () => setShowing(!showing)

  return <div className='settings'>
    <FaRegSun onClick={toggle} />
    <Modal isOpen={showing} onRequestClose={toggle}>
      <Customization settings={settings} value={value} onChange={onChange} />
      <DangerZone character={character} />
    </Modal>
  </div>
}
