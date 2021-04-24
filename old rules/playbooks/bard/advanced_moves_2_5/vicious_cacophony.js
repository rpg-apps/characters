import Move, { Procedure } from '../../../move'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const viciousCacophony = new Move({
	title: 'Vicious Cacophony',
	text: 
`When you grant bonus damage with arcane art, you grant an extra +1d4 damage.`,

	procedure: new Procedure(CONSTANT, modifier('+1d4', { on: 'arcance art bonus damage', ongoing: true, forced: true }))
})

export default viciousCacophony