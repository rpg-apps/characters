import Move, { Procedure } from '../move'
import empoweredMagic from '../advanced_moves_2_5/empowered_magic'

const { modifier, CONSTANT } = Procedure

const greaterEmpoweredMagic = new Move({
	title: 'Greater Empowered Magic',
	text: 
``,

	procedure: new Procedure(CONSTANT, ),

    replaces: empoweredMagic
})

export default greaterEmpoweredMagic