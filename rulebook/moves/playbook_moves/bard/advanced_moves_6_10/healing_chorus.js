import Move, { Procedure } from '../move'
import healingSong from '../advanced_moves_2_5/healing_song'

const { modifier, CONSTANT } = Procedure

const healingChorus = new Move({
	title: 'Healing Chorus',
	text: 
`When you heal with arcane art, you heal +2d8 damage.`,

	procedure: new Procedure(CONSTANT, modifier('+2d8', { on: 'arcane art healing', ongoing: true, forced: true }))

    replaces: healingSong
})

export default healingChorus