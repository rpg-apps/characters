import Move from '../../../move'
import holyProtection from '../advanced_moves_2_5/holy_protection'

import Procedure, { modifier, condition, CONSTANT } from '../../../move_procedure'

const divineProtection = new Move({
	title: 'Divine Protection',
	text: 
`You get +2 armor while on a quest.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: holyProtection
})

export default divineProtection