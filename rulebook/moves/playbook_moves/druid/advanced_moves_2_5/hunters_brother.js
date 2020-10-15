import Move, { Procedure } from '../move'

const { multiclass } = Procedure

const huntersBrother = new Move({
	title: 'Hunters Brother',
	text: 
`Choose one move from the ranger class list.`,

	procedure: new Procedure('', multiclass())
})

export default huntersBrother