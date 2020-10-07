import Move, { Procedure } from '../../../move'

const { modifier, CONSTANT } = Procedure

const eldritchTones = new Move({
	title: 'Eldritch Tones',
	text: 
`Your arcane art is strong, allowing you to choose two effects instead of one.`,

	procedure: new Procedure(CONSTANT, modifier('choice*2', { on: 'arcane art', ongoing: true }))
})

export default eldritchTones