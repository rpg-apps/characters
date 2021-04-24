import Move from '../../../move'
import chosenOne from '../advanced_moves_2_5/chosen_one'

import Procedure, { CONSTANT } from '../../../move_procedure'

const anointed = new Move({
	title: 'Anointed',
	text: 
`Choose one spell in addition to the one you picked for chosen one. You are granted that spell as if it was one level lower.`,

	procedure: new Procedure(CONSTANT, ),

    requires: chosenOne
})

export default anointed