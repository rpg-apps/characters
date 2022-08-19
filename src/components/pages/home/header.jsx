import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useAuth } from '../../contexts/auth-context'
import Logo from '../../presentation/logo'

export default function Header () {
  const [open, setOpen] = useState(false)

  return <AppBar className='header'>
    <Toolbar>
      <Logo />
      <div id='app-name'>Characters</div>
      <IconButton><MoreVertIcon/></IconButton>
      <Menu id='menu-appbar' open={open}>
        <MenuItem>Graveyard</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem><LogoutIcon /> Logout</MenuItem>
      </Menu>
    </Toolbar>
  </AppBar>
}
