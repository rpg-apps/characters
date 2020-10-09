import Move, { Procedure } from '../move'

const { condition, CONSTANT } = Procedure

const theOneWhoKnocks = new Move({
	title: 'The One Who Knocks',
	text: 
`When you defy danger, on a 12+ you turn the danger back on itself, the GM will describe how.`,

	procedure: new Procedure(CONSTANT, )
})

export default theOneWhoKnocks