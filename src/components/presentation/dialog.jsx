import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

export default function ControlledDialog ({ children, ...props }) {
  const [showing, setShowing] = useState(false)

  const open = () => setShowing(true)
  const close = () => setShowing(false)

  const handleAction = callback => {
    callback()
    close()
  }

  props.sx = props.sx || {}

  const [anchor, ...content] = children
  const { title, actions, ...dialogProps } = props

  return <>
    <Stack onClick={open}>{anchor}</Stack>
    <Dialog open={showing} onClose={close} {...dialogProps} >
      {title ? <DialogTitle>{title}</DialogTitle> : ''}
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{actions.map(({ text, onClick, ...props }, index) => <Button key={index} onClick={() => handleAction(onClick)} {...props}>{text}</Button>)}</DialogActions>
      {}
    </Dialog>
  </>
}
