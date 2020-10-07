import Move, { Procedure } from '../../../move'

const { multiclass, CONSTANT } = Procedure

const multiclassInitiate = new Move({
	title: 'Multiclass Initiate',
	text: 
`Get one move from another class. Treat your level as one lower for choosing the move.`,

	procedure: new Procedure(CONSTANT, multiclass(null, '-1'))
})

export default multiclassInitiate