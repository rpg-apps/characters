import Move, { Procedure } from '../move'

const { multiclass, CONSTANT } = Procedure

const appetiteForDestruction = new Move({
	title: 'Appetite For Destruction',
	text: 
`Take a move from the fighter, bard or thief class list. You may not take multiclass moves from those classes.`,

	procedure: new Procedure(CONSTANT, multiclass())
})

export default appetiteForDestruction