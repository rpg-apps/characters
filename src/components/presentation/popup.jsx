import { useState } from 'react'
import Popover from '@mui/material/Popover'

export default function Popup ({ children, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = event => setAnchorEl(event.currentTarget)
  const close = () => setAnchorEl(null)

  props.sx = props.sx || {}

  if (props.arrow) {
    props.sx = { ...props.sx, ...ARROW_SX }
    delete props.arrow
  }

  return <>
    <div className='popup-container' onClick={open}>{children[1]}</div>
    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={close} {...props} >
      {children[0]}
    </Popover>
  </>
}

const ARROW_SX = {
  '.MuiPaper-root': {
    'overflow': 'visible',

    '&:before': {
      content: '""',
      position: 'absolute',
      right: '0.75rem',
      top: '-1rem',
      width: '1rem',
      height: '1rem',
      zIndex: 3,
      borderStyle: 'solid',
      borderWidth: '0 0.5rem 0.5rem 0.5rem',
      borderColor: 'transparent transparent #2f2f2f transparent'
    }
  }
}
