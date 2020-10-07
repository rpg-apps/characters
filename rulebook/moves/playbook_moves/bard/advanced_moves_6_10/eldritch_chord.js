import Move, { Procedure } from '../move'
import eldritchTones from '../advanced_moves_2_5/eldritch_tones'

const { modifier, multipleEffects, CONSTANT } = Procedure

const eldritchChord = new Move({
	title: 'Eldritch Chord',
	text: 
`When you use arcane art, you choose two effects. You also get to choose one of those effects to double.`,

	procedure: new Procedure(CONSTANT, multipleEffects(
		modifier('choice*2', { on: 'arcane art', ongoing: true }),
		modifier('effect*2', { on: 'one of the effects', ongoing: true }))),

    replaces: eldritchTones
})

export default eldritchChord