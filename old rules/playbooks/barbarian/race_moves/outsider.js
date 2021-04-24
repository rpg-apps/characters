import Move from '../../../move'
import Procedure, { choice, changeStat, NO_EFFECT, STATS } from '../../../move_procedure'

const outsider = new Move({
	title: 'Outsider',
	text: 
`You may be elf, dwarf, halfling, or human, but you and your people are not from around here. At the beginning of each session, the GM will ask you something about your homeland, why you left, or what you left behind. If you answer them, mark XP.`,

	procedure: new Procedure('At the beginning of each session', choice('Did you answer the GM\'s question', {
		'Yes': changeStat(STATS.XP, 1),
		'No': NO_EFFECT
	}))
})

export default outsider