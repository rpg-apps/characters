import Move, { Procedure } from '../move'
import hospitaller from '../advanced_moves_2_5/hospitaller'

const { modifier, CONSTANT } = Procedure

const perfectHospitaller = new Move({
	title: 'Perfect Hospitaller',
	text: 
`When you heal an ally, you heal +2d8 damage.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: hospitaller
})

export default perfectHospitaller