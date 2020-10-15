import Move, { Procedure } from '../move'

const { multiclass, CONSTANT } = Procedure

const human = new Move({
	title: 'Human',
	text: 
`Choose one cleric spell. You can cast it as if it was a wizard spell.`,

	procedure: new Procedure(CONSTANT, multiclass())
})

export default human