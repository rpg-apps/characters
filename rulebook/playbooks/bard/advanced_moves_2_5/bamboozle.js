import Move, { Procedure } from '../../../move'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const bamboozle = new Move({
	title: 'Bamboozle',
	text: 
``,

	procedure: new Procedure(CONSTANT, modifier('+1', { on: 'after parley partial success', usages: 1, forced: true }))
})

export default bamboozle