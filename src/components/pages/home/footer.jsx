// import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export default function Footer ({ graveyardLink }) {
  return <footer>
    <Button href='/new' variant='contained' startIcon={<AddIcon />}>Create</Button>
  </footer>
}
