import Move from '../move'
import Procedure, { choice, changeStats, simultaneous, STATS } from '../move_procedure'

const recover = new Move({
	title: 'Recover',
	text: 
`When you do nothing but rest in comfort and safety after a day of rest you recover all your HP. After three days of rest you remove one debility of your choice. If you’re under the care of a healer (magical or otherwise) you heal a debility for every two days of rest instead.`,

	procedure: new Procedure('When you do nothing but rest in comfort and safety', choice('How long do you rest', {
		'One day - recover all your HP': changeStats(STATS.HP, '+maxHP'),
		'Three days, or two days with a healer - also remove a debility': simultaneous(changeStats(STATS.HP, '+maxHP'), choice('Choose a debility to remove', {
			'Weak': changeStats(STATS.WEAK, -1),
			'Shakey': changeStats(STATS.SHAKEY, -1),
			'Sick': changeStats(STATS.SICK, -1),
			'Stunned': changeStats(STATS.STUNNED, -1),
			'Confused': changeStats(STATS.CONFUSED, -1),
			'Scarred': changeStats(STATS.SCARRED, -1)
		}))
	}))
})

export default recover