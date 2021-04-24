import Move, { Procedure } from '../../../move'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const healingSong = new Move({
	title: 'Healing Song',
	text: 
`When you heal with arcane art, you heal +1d8 damage.`,

	procedure: new Procedure(CONSTANT, modifier('+1d8', { on: 'arcane art healing', ongoing: true, forced: true }))
})

export default healingSong