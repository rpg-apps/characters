import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const bamboozle = new Move({
	title: 'Bamboozle',
	text: 
``,

	procedure: new Procedure(CONSTANT, modifier('+1', { on: 'after parley partial success', usages: 1, forced: true }))
})

export default bamboozle