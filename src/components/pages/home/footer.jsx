import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'

import { useAuth } from '../../contexts/auth-context'

export default function Footer () {
  const { logOut } = useAuth()

  return <div className='footer'>
    <Link className='primary button' to='/new'><FaPlus /> Create</Link>
    <div className='link' onClick={logOut}><FaSignOutAlt /> logout</div>
  </div>
}
