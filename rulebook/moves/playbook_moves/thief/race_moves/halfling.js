import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const halfling = new Move({
	title: 'Halfling',
	text: 
`When you attack with a ranged weapon, deal +2 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default halfling