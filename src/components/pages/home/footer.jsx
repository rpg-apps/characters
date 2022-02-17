import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'

import { useAuth } from '../../contexts/auth-context'

export default function Footer ({ graveyardLink }) {
  const { logOut } = useAuth()

  return <div className='footer'>
    <Link className='primary button' to='/new'><FaPlus /> Create</Link>
    <div className='links'>
      {graveyardLink}
      <div className='link' onClick={logOut}><FaSignOutAlt /> logout</div>
    </div>
  </div>
}
