import { useState, useEffect, useRef } from 'react'

import '../../../css/pages/new.scss'

import PrgoressMenu from './progress-menu'
import Page from '../../presentation/page'

import { useForceUpdate } from '../../hooks/force-update'

import GameStep from './steps/game-step'
import PlaybookStep from './steps/playbook-step'

const INITIAL_STEPS = [GameStep, PlaybookStep]

export default function New () {
  const [state, update] = useState({ index: 0, value: undefined, steps: INITIAL_STEPS })
  const [loading, setLoading] = useState(false)
  const stepRef = useRef()
  const forceUpdate = useForceUpdate()
  const setState = newState => update(Object.assign({}, state, newState))

  useEffect(forceUpdate, [stepRef, state])

  const Step = state.steps[state.index]

  const setValue = async value => setState({ value })

  const next = async () => {
    const step = stepRef.current
    if (step.finish) return step.finish()
    const value = await step.next()
    const additionalSteps = step.additionalSteps ? step.additionalSteps() : []
    const steps = state.steps.concat(additionalSteps)
    setState({ value, steps, index: state.index + 1 })
  }
  const back = async () => {
    const step = stepRef.current
    if (step.cancel) return step.cancel()
    const value = await step.back()
    const additionalSteps = step.additionalSteps ? step.additionalSteps() : []
    const steps = state.steps.filter(step => !additionalSteps.includes(step))
    setState({ value, steps, index: state.index - 1 })
  }

  return <Page name='new' loading={loading}>
    <Step value={state.value} update={forceUpdate} setValue={setValue} ref={stepRef} setLoading={setLoading} />
    <PrgoressMenu steps={state.steps.length + 1} step={state.index}
      next={next} back={back} canBack={stepRef.current?.canBack} canNext={stepRef.current?.canNext} />
  </Page>
}
