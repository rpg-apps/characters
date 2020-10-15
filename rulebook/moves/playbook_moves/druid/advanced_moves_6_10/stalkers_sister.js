import Move, { Procedure } from '../move'

const { multiclass } = Procedure

const stalkersSister = new Move({
	title: 'Stalkers Sister',
	text: 
`Choose one move from the ranger class list.`,

	procedure: new Procedure('', multiclass())
})

export default stalkersSister