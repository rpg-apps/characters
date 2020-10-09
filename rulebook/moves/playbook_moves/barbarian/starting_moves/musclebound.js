import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const musclebound = new Move({
	title: 'Musclebound',
	text: 
`While you wield a weapon it gains the forceful and messy tags.`,

	procedure: new Procedure(CONSTANT, modifier('+forceful +messy', { ongoing: true }))
})

export default musclebound