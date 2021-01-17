import Move from '../../../move'
import eldritchTones from '../advanced_moves_2_5/eldritch_tones'

import Procedure, { modifier, simultaneous, CONSTANT } from '../../../move_procedure'

const eldritchChord = new Move({
	title: 'Eldritch Chord',
	text: 
`When you use arcane art, you choose two effects. You also get to choose one of those effects to double.`,

	procedure: new Procedure(CONSTANT, simultaneous(
		modifier('choice*2', { on: 'arcane art', ongoing: true }),
		modifier('effect*2', { on: 'one of the effects', ongoing: true }))),

    replaces: eldritchTones
})

export default eldritchChord