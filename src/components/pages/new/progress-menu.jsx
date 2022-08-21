import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import CheckIcon from '@mui/icons-material/Check'

const DO_NOTHING = () => {}

export default function PrgoressMenu ({ steps, step, canNext = true, canPrevious = true, next = DO_NOTHING, back = DO_NOTHING }) {
  const backButton = <Button size="small" onClick={back} disabled={!canPrevious}><ArrowLeftIcon /> Back</Button>
  const nextButton = (() => {
    if (step === steps.length - 1)
      return <Button size="small" onClick={next} disabled={!canNext}>Finish <CheckIcon /></Button>
    else
      return <Button size="small" onClick={next} disabled={!canNext}>Next <ArrowRightIcon /></Button>
  }) ()

  return <MobileStepper variant='progress' steps={steps} activeStep={step} nextButton={nextButton} backButton={backButton} />
}
