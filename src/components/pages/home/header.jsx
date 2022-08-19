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

export default function Header ({ graveyardControl }) {
  const { logOut } = useAuth()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [graveyard, setGraveyard] = graveyardControl

  return <AppBar className='header'>
    <Toolbar>
      <Logo />
      <div id='app-name'>Characters</div>
      <IconButton onClick={event => setMenuAnchor(event.currentTarget)}><MoreVertIcon/></IconButton>
      <Menu id='menu-appbar' anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => setGraveyard(!graveyard)}>{graveyard ?  'Back' : 'Graveyard'}</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem onClick={logOut}><LogoutIcon /> Logout</MenuItem>
      </Menu>
    </Toolbar>
  </AppBar>
}
