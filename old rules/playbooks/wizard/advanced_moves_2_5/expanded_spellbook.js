import Move from '../../../move'
import Procedure, { multiclass } from '../../../move_procedure'

const expandedSpellbook = new Move({
	title: 'Expanded Spellbook',
	text: 
`Add a new spell from the spell list of any class to your spellbook.--constant`,

	procedure: new Procedure('', multiclass())
})

export default expandedSpellbook