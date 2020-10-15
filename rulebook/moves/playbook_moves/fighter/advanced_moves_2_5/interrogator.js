import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const interrogator = new Move({
	title: 'Interrogator',
	text: 
`When you parley using threats of impending violence as leverage, you may use STR instead of CHA.`,

	procedure: new Procedure(CONSTANT, )
})

export default interrogator