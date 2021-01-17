import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const unnaturalAlly = new Move({
	title: 'Unnatural Ally',
	text: 
`Your animal companion is a monster, not an animal. Describe it. Give it +2 ferocity and +1 instinct, plus a new training.`,

	procedure: new Procedure(CONSTANT, )
})

export default unnaturalAlly