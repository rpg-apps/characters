import GameStep from './game-step'
// import PlaybookStep from './playbook-step'
// import TypeChoiceStep from './type-choice-step'
// import FieldChoiceStep from './field-choice-step'
// import AssignmentChoiceStep from './assignment-choice-step'

const STEP_COMPONENTS = {
  game: GameStep,
  // playbook: PlaybookStep,
  // TypeChoice: TypeChoiceStep,
  // FieldChoice: FieldChoiceStep,
  // AssignmentChoice: AssignmentChoiceStep
}

export default function Step ({ step, control }) {
  const Component = STEP_COMPONENTS[step] || STEP_COMPONENTS[typeof(step)]
  return <Component step={step} control={control} />
}
