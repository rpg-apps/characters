import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSignOutAlt, FaBookDead, FaArrowLeft } from 'react-icons/fa'

import { useAuth } from '../../contexts/auth-context'

export default function Footer ({ graveyard }) {
  const { logOut } = useAuth()

  const graveyardLink = graveyard ?
    <Link className='link' to='/'><FaArrowLeft /> Back</Link>
    :
    <Link className='link' to='/graveyard'><FaBookDead /> Graveyard</Link>

  return <div className='footer'>
    <Link className='primary button' to='/new'><FaPlus /> Create</Link>
    <div className='links'>
      {graveyardLink}
      <div className='link' onClick={logOut}><FaSignOutAlt /> logout</div>
    </div>
  </div>
}
