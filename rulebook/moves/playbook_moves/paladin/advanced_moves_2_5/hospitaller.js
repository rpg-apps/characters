import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const hospitaller = new Move({
	title: 'Hospitaller',
	text: 
`When you heal an ally, you heal +1d8 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default hospitaller