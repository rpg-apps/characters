import Move, { Procedure } from '../move'
import followMe from '../advanced_moves_2_5/follow_me'

const { modifier, CONSTANT } = Procedure

const strider = new Move({
	title: 'Strider',
	text: 
`When you undertake a perilous journey you can take two roles. Roll twice and use the better result for both roles.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: followMe
})

export default strider