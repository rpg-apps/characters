import { withJsonFormsControlProps } from '@jsonforms/react'
import { rankWith, isNumberControl } from '@jsonforms/core'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

const STYLES = {
  '.MuiInput-root': {
    '&::before': { content: 'unset' },
    '&::after': { content: 'unset' },
    input: { textAlign: 'center' }
  }
}

const renderer = withJsonFormsControlProps(function NumberControl ({ data, handleChange, path, ...options }) {
  const { max, min } = options.schema

  const validate = value => {
    value = Number(value)
    if (min)  value = Math.max(value, min)
    if (max)  value = Math.min(value, min)
    return value
  }

  return <Stack direction='row' alignItems='center'>
    <Typography variant='button' sx={{ flexGrow: 1 }}>{path} :</Typography>
    <Stack className='number-control' direction='row' width='7rem' alignItems='center' sx={STYLES}>
      <IconButton disabled={data === min} onClick={() => handleChange(path, data - 1)}><RemoveCircleIcon fontSize='small'/></IconButton>
      <Input value={data} onChange={event => handleChange(path, validate(event.target.value))} />
      <IconButton disabled={data === max} onClick={() => handleChange(path, data + 1)}><AddCircleIcon fontSize='small'/></IconButton>
    </Stack>
  </Stack>
})

const tester = rankWith(3, isNumberControl)

export default { renderer, tester }
