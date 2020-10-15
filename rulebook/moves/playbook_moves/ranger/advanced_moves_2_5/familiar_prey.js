import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const familiarPrey = new Move({
	title: 'Familiar Prey',
	text: 
`When you spout lore about a monster you use WIS instead of INT.`,

	procedure: new Procedure(CONSTANT, )
})

export default familiarPrey