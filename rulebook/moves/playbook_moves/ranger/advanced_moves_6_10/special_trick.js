import Move, { Procedure } from '../move'

const { multiclass } = Procedure

const specialTrick = new Move({
	title: 'Special Trick',
	text: 
`Choose a move from another class. So long as you are working with your animal companion you have access to that move.`,

	procedure: new Procedure('', multiclass())
})

export default specialTrick