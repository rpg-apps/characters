import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export default function Footer ({ graveyardLink }) {
  const history = useHistory()
  return <AppBar className='footer' sx={{ top: 'auto', bottom: 0 }}>
    <Button onClick={() => history.push('/new')} variant='contained' startIcon={<AddIcon />}>Create</Button>
  </AppBar>
}
