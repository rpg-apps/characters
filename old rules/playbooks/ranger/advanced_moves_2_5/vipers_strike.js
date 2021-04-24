import Move from '../../../move'
import Procedure, { modifier } from '../../../move_procedure'

const vipersStrike = new Move({
	title: 'Vipers Strike',
	text: 
`When you strike an enemy with two weapons at once, add an extra 1d4 damage for your off-hand strike.`,

	procedure: new Procedure('When you strike an enemy with two weapons at once', )
})

export default vipersStrike