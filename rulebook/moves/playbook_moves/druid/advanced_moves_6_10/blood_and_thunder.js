import Move, { Procedure } from '../move'
import redOfToothAndClaw from '../advanced_moves_2_5/red_of_tooth_and_claw'

const { modifier, condition, CONSTANT } = Procedure

const bloodAndThunder = new Move({
	title: 'Blood And Thunder',
	text: 
`When you are in an appropriate animal form (something dangerous) increase your damage to d10.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: redOfToothAndClaw
})

export default bloodAndThunder