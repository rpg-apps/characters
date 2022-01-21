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

  return <div className='dangerous group'>
    <div className='group-title'>danger zone</div>
    <Input type='text' text={`Type the ${approvalText} name and press the button to delete it.`} onChange={setApprovalInput}/>
    <div className={`button ${approvalInput !== approvalText ? 'disabled' : ''}`} onClick={submitDelete}>Delete</div>
  </div>
}
