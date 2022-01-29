import React from 'react'
import { FaArrowRight, FaCheck } from 'react-icons/fa'

export default function ChoiceSubmit ({ enabled, builder, onClick }) {
  const hasNextChoice = builder.hasNexChoice()

  return <div className={`${enabled ? '' : 'disabled'} button`} onClick={onClick}>
    {hasNextChoice ? <FaArrowRight /> : <FaCheck />}
    {hasNextChoice ? 'next' : 'done'}
  </div>
}
