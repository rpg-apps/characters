import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const serenity = new Move({
	title: 'Serenity',
	text: 
`When you cast a spell you ignore the first -1 penalty from ongoing spells.`,

	procedure: new Procedure(CONSTANT, )
})

export default serenity