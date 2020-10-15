import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const cheapShot = new Move({
	title: 'Cheap Shot',
	text: 
`When using a precise or hand weapon, your backstab deals an extra +1d6 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default cheapShot