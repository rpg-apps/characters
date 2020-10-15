import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const halfling = new Move({
	title: 'Halfling',
	text: 
`When you defy danger and use your small size to your advantage, take +1.`,

	procedure: new Procedure(CONSTANT, )
})

export default halfling