import Move, { Procedure } from '../../../move'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const duelistsParry = new Move({
	title: 'Duelist’s Parry',
	text: 
`When you hack and slash, you take +1 armor forward.`,

	procedure: new Procedure(CONSTANT, modifier('+1 armor', { on: 'after hack and slash', usages: 1, forced: true }))
})

export default duelistsParry