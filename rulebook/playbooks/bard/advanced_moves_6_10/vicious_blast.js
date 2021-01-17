import Move from '../../../move'
import viciousCacophony from '../advanced_moves_2_5/vicious_cacophony'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const viciousBlast = new Move({
	title: 'Vicious Blast',
	text: 
`When you grant bonus damage with arcane art, you grant an extra +2d4 damage.`,

	procedure: new Procedure(CONSTANT, modifier('+2d4', { on: 'arcance art bonus damage', ongoing: true, forced: true }))

    replaces: viciousCacophony
})

export default viciousBlast