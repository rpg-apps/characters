import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function ChoiceSubmit ({ enabled, builder, onClick }) {
  const hasNextChoice = builder.hasNexChoice()

  return <div className={`${enabled ? '' : 'disabled'} primary button`} onClick={onClick}>
    {hasNextChoice ? <ArrowForwardIcon /> : <CheckIcon />}
    {hasNextChoice ? 'next' : 'done'}
  </div>
}
