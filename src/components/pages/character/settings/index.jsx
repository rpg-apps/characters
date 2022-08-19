import React, { useState } from 'react'
import Modal from 'react-modal'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Customization from './customization'
import DangerZone from './danger-zone'
import Plan from './plan'

import { useForceUpdate } from '../../../hooks/force-update'

Modal.setAppElement('#root')

export default function CharacterSettings ({ character, onChange }) {
  const [showing, setShowing] = useState(false)
  const forceUpdate = useForceUpdate()
  const toggle = () => setShowing(!showing)

  const settings = character.adapters.reduce((results, adapter) => ({ ...results, ...adapter.settings }), { })

  const set = async settings => {
    await character.save()
    character.setSettings(settings)
    onChange()
    forceUpdate()
  }

  const custom = character.plans.every(plan => character.settings !== plan.name)

  return <div className='settings'>
    <MoreVertIcon onClick={toggle} />
    <Modal className='settings' isOpen={showing} onRequestClose={toggle}>
      {character.plans.map(plan => <Plan selected={character.settings === plan.name} key={plan.name} name={plan.name} description={plan.description} onClick={async () => await set(plan.name)} />)}
      <Customization.Button selected={custom} onClick={async () => await set({})}/>
      {custom ? <Customization settings={settings} value={character.settings} onChange={onChange} /> : '' }
      <DangerZone character={character} />
    </Modal>
  </div>
}
