import Move, { Procedure } from '../move'
import empower from '../advanced_moves_2_5/empower'

const { modifier, CONSTANT } = Procedure

const greaterEmpower = new Move({
	title: 'Greater Empower',
	text: 
``,

	procedure: new Procedure(CONSTANT, ),

    replaces: empower
})

export default greaterEmpower