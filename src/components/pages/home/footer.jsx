import { useHistory } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export default function Footer ({ graveyardLink }) {
  const history = useHistory()
  return <footer>
    <Button onClick={() => history.push('/new')} variant='contained' startIcon={<AddIcon />}>Create</Button>
  </footer>
}
