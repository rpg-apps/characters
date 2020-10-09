import Move, { Procedure } from '../move'

const { modifier, condition, CONSTANT } = Procedure

const aGoodWayToDay = new Move({
	title: 'A Good Way To Day',
	text: 
`As long as you have less than your Con in current HP (or 1, whichever is higher) take +1 ongoing.`,

	procedure: new Procedure(CONSTANT, )
})

export default aGoodWayToDay