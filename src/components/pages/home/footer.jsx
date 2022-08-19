import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export default function Footer ({ graveyardLink }) {
  return <div className='footer'>
    <Button variant='contained' startIcon={<AddIcon />}>Create</Button>
  </div>
}
