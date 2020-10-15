import Move, { Procedure } from '../move'
import counterspell from '../advanced_moves_2_5/counterspell'

const {  } = Procedure

const protectiveCounter = new Move({
	title: 'Protective Counter',
	text: 
`When an ally within sight of you is affected by an arcane spell, you can counter it as if it affected you. If the spell affects multiple allies you must counter for each ally separately.`,

	procedure: new Procedure('When an ally within sight of you is affected by an arcane spell', you can counter it as if it affected you. If the spell affects multiple allies you must counter for each ally separately.),

    requires: counterspell
})

export default protectiveCounter