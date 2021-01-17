import Move from '../move'
import Equipment from '../../equipment'
import Procedure, { choice, condition, changeStat, series, useGear, triggerMove, STATS } from '../move_procedure'

const makeCamp = new Move({
	title: 'Make Camp',
	text: 
`When you settle in to rest consume a ration.
If you’re somewhere dangerous decide the watch order as well.
If you have enough XP you may level up.
When you wake from at least a few uninterrupted hours of sleep heal damage equal to half your max HP.`,

	procedure: new Procedure('When you settle in to rest', series(
		useGear(Equipment.RATIONS, 1),
		choice('Are you somewhere dangerous and want to decide on the watch order?', {
			'Yes': triggerMove('Take Watch'),
			'No': NO_EFFECT
		}),
		condition('xp-level>=7', triggerMove('Level Up')),
		choice('Did you get at least a few uninterrupted hours of sleep?', {
			'Yes': changeStat(STATS.HP, '+0.5*maxHP'),
			'No': NO_EFFECT
		})))
})

export default makeCamp
