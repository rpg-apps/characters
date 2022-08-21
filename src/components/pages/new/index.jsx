import { useState } from 'react'

import '../../../css/pages/new.scss'

import PrgoressMenu from './progress-menu'
import Loader from '../../presentation/loader'
import Step from './step'

export default function New () {
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState(['game', 'playbook'])
  const [stepIndex, setStepIndex] = useState(0)
  const [value, setValue] = useState(undefined)

  const next = () => setStepIndex(stepIndex + 1)
  const back = () => setStepIndex(stepIndex - 1)

  const step = steps[stepIndex]

  if (loading) {
    return <Loader className='new page' />
  }

  return <div className='new page'>
    <Step step={step} control={[value, setValue]} />
    <PrgoressMenu steps={steps.length} step={stepIndex} back={step.back} next={step.next} />
  </div>
}
