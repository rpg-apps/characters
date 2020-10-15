import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const unnaturalAlly = new Move({
	title: 'Unnatural Ally',
	text: 
`Your animal companion is a monster, not an animal. Describe it. Give it +2 ferocity and +1 instinct, plus a new training.`,

	procedure: new Procedure(CONSTANT, )
})

export default unnaturalAlly