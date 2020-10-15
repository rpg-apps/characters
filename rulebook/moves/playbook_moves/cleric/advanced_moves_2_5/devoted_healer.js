import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const devotedHealer = new Move({
	title: 'Devoted Healer',
	text: 
`When you heal someone else of damage, add your level to the amount of damage healed.`,

	procedure: new Procedure(CONSTANT, )
})

export default devotedHealer