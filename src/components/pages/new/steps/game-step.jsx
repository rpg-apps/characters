import { forwardRef, useImperativeHandle } from 'react'
import { useHistory } from 'react-router'

import { useRules } from '../../../contexts/rules-context'
import { useSupportedRulebooks } from '../../../contexts/game-adapters-context'

import OptionsStep from './options-step'

export default forwardRef(function GameStep ({ value, setValue }, ref) {
  const rules = useRules()
  const history = useHistory()
  const supportedRulebooks = useSupportedRulebooks()

  useImperativeHandle(ref, () => ({
    canBack: true,
    canNext: Boolean(value && value.length > 0),
    next: async () => (await rules.get(value)).characters.builder,
    back: () => {},
    cancel: () => history.push('/')
  }))

  const selected = rulebook => value && value.includes(rulebook)

  const toggleRulebook = rulebook => {
    if (selected(rulebook)) {
      setValue(value.filter(rb => rb !== rulebook))
    } else {
      setValue((value || []).concat([rulebook]))
    }
  }

  const RulebookOption = ({ option }) => <div className={`rulebook card ${option}`}></div>

  return <OptionsStep className='game' title='choose a game' Option={RulebookOption}
    options={supportedRulebooks} select={toggleRulebook} selected={selected} />
})
