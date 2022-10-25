import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import { Selection } from '../../../presentation/character/selection'
import ChoiceStep from './choice-step'

export default forwardRef(function PlaybookStep ({ value: builder, update }, ref) {
  const [playbook, setPlaybook] = useState(undefined)

  useEffect(update, [playbook, update])

  useImperativeHandle(ref, () => ({
    canBack: true,
    canNext: Boolean(playbook),
    next: async () => {
      builder.start(playbook)
      builder.character.save = () => {}
      return builder
    },
    back: () => [],
    additionalSteps: () => builder.playbook.rules.choices.map(() => ChoiceStep)
  }))

  return <Selection className='playbook step' title='choose a playbook' options={builder.playbookOptions()} select={setPlaybook} selected={pb => pb === playbook}>
    {playbook => <div className={`playbook card ${playbook}`}></div>}
  </Selection>
})
