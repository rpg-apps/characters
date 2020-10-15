import Move, { Procedure } from '../move'
import prodigy from '../advanced_moves_2_5/prodigy'

const { modifier, CONSTANT } = Procedure

const master = new Move({
	title: 'Master',
	text: 
`Choose one spell in addition to the one you picked for prodigy. You prepare that spell as if it were one level lower.`,

	procedure: new Procedure(CONSTANT, ),

    requires: prodigy
})

export default master