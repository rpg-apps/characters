import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import OptionsStep from './options-step'
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

  const PlaybookOption = ({ option }) => <div className={`playbook card ${option}`}></div>

  return <OptionsStep className='playbook' title='choose a playbook' Option={PlaybookOption}
    options={builder.playbookOptions()} select={setPlaybook} selected={pb => pb === playbook} />
})
