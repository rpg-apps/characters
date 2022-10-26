import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'

export default function Popup ({ children, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = event => setAnchorEl(event.currentTarget)
  const close = () => setAnchorEl(null)

  props.sx = props.sx || {}

  if (props.arrow) {
    props.sx = { ...props.sx, ...arrowSX(props.arrow) }
    delete props.arrow
  }

  const [anchor, ...content] = children

  return <>
    <Stack onClick={open} sx={{ '> :only-child': { width: 1, height: 1 } }}>{anchor}</Stack>
    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={close} {...props} >
      {content}
    </Popover>
  </>
}

const SIDES = ['top', 'right', 'bottom', 'left']
const arrowSX = arrow => {
  const [side, alignment] = arrow.split(' ')

  const sideIndex = SIDES.indexOf(side)
  const borderWidth = new Array(4).fill(1).map((borderSide, borderSideIndex) => borderSideIndex === sideIndex ? '0' : '0.5rem').join(' ')
  const borderColor = new Array(4).fill(1).map((borderSide, borderSideIndex) => borderSideIndex === (sideIndex + 2) % 4 ? '#2f2f2f' : 'transparent').join(' ')

  const position = { [side]: '-1rem' }
  if (alignment === 'center') {
    Object.assign(position, { [['top', 'bottom'].includes('side') ? 'left' : 'top']: 'calc(50% - 0.5rem)' })
  } else {
    Object.assign(position, { [alignment]: '0.75rem' })
  }

  return {
    '.MuiPaper-root': {
      'overflow': 'visible',

      '&:before': {
        content: '""',
        position: 'absolute',
        width: '1rem',
        height: '1rem',
        zIndex: 3,
        borderStyle: 'solid',
        borderWidth,
        borderColor,
        ...position
      }
    }
  }
}
