import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

export default function Footer () {
  return <div className='footer'>
    <Link className='button' to='/new'><FaPlus /> Create</Link>
  </div>
}
