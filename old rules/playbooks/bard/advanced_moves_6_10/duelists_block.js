import Move from '../../../move'
import duelistsParry from '../advanced_moves_2_5/duelists_parry'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const duelistSBlock = new Move({
	title: 'Duelist\'s Block',
	text: 
`When you hack and slash, you take +2 armor forward.`,

	procedure: new Procedure(CONSTANT, modifier('+2 armor', { on: 'after hack and slash', usages: 1, forced: true })),

    replaces: duelistsParry
})

export default duelistSBlock