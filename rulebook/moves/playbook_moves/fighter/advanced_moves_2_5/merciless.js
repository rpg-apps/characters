import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const merciless = new Move({
	title: 'Merciless',
	text: 
`When you deal damage, deal +1d4 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default merciless