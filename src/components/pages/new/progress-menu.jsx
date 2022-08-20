import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const DO_NOTHING = () => {}

export default function PrgoressMenu ({ steps, step, canNext = true, canPrevious = true, next = DO_NOTHING, back = DO_NOTHING }) {
  const theme = useTheme()

  return <MobileStepper
    variant='progress'
    steps={steps}
    activeStep={step}
    nextButton={
      <Button size="small" onClick={next} disabled={!canNext || step === steps.length - 1}>
        Next
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </Button>
    }
    backButton={
      <Button size="small" onClick={back} disabled={!canPrevious || step === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        Back
      </Button>
    }
  />
}
