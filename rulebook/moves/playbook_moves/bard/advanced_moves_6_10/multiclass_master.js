import Move, { Procedure } from '../move'

const { multiclass, CONSTANT } = Procedure

const multiclassMaster = new Move({
	title: 'Multiclass Master',
	text: 
`Get one move from another class. Treat your level as one lower for choosing the move.`,

	procedure: new Procedure(CONSTANT, multiclass(null, '-1'))
})

export default multiclassMaster