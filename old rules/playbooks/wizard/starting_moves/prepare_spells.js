import Move from '../../../move'
import Procedure, { modifier, changeStat, STATS, simultaneous } from '../../../move_procedure'

const prepareSpells = new Move({
	title: 'Prepare Spells',
	text: 
`When you spend uninterrupted time (an hour or so) in quiet contemplation of your spellbook`,

	procedure: new Procedure('When you spend uninterrupted time (an hour or so) in quiet contemplation of your spellbook', )
})

export default prepareSpells