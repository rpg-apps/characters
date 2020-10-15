import Move, { Procedure } from '../move'

const { multiclass, CONSTANT } = Procedure

const ogdruJahad = new Move({
	title: 'Ogdru Jahad',
	text: 
`Gain the Wizard move Ritual. The GM will always tell you what you have to sacrifice to gain the effect you desire.`,

	procedure: new Procedure(CONSTANT, multiclass())
})

export default ogdruJahad