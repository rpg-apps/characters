import Move, { Procedure } from '../move'
import holyProtection from '../advanced_moves_2_5/holy_protection'

const { modifier, condition, CONSTANT } = Procedure

const divineProtection = new Move({
	title: 'Divine Protection',
	text: 
`You get +2 armor while on a quest.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: holyProtection
})

export default divineProtection