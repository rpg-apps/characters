import Move, { Procedure } from '../move'
import steupStrike from '../advanced_moves_2_5/steup_strike'

const { modifier, CONSTANT } = Procedure

const tandemStrike = new Move({
	title: 'Tandem Strike',
	text: 
`When you hack and slash, choose an ally. Their next attack against your target does +1d4 damage and they take +1 forward against them.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: steupStrike
})

export default tandemStrike