import Move from '../../../move'
import Procedure, { multiclass } from '../../../move_procedure'

const godAmidstTheWastes = new Move({
	title: 'God Amidst The Wastes',
	text: 
`Dedicate yourself to a deity (name a new one or choose one that’s already been established). You gain the commune and cast a spell cleric moves. When you select this move, treat yourself as a cleric of level 1 for using spells. Every time you gain a level thereafter, increase your effective cleric level by 1.`,

	procedure: new Procedure('', multiclass())
})

export default godAmidstTheWastes