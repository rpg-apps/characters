import React, { useState } from 'react'
import { useHistory } from 'react-router'

import Input from '../../../presentation/input'

export default function DangerZone ({ character }) {
  const [approvalInput, setApprovalInput] = useState('')
  const history = useHistory()
  const approvalText = character.rulebooks[0].split(' ')[0]

  const submitDelete = async () => {
    await character.delete()
    history.push('/')
  }

  const kill = async () => {
    await character.die()
    await character.save()
    history.push('/')
  }

  return <div className='danger-zone'>
    <div className='group-title'>Danger Zone</div>
    <label>A dead character would not show in the homescreen, but you can see it in the graveyard and revive it.</label>
    <div className='button' onClick={kill}>Kill this character</div>
    <Input.Controlled type='text' text={`Type ${approvalText} and press the button to delete this character. This operation is irreversible.`} control={[approvalInput, setApprovalInput]}/>
    <div className={`button ${approvalInput !== approvalText ? 'disabled' : ''}`} onClick={submitDelete}>Delete</div>
  </div>
}
