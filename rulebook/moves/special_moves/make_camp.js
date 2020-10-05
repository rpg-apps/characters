import Move, { Procedure } from '../move'
import Equipment from '../../equipment'

const { choice, condition, changeStat, multipleEffects, useUpGear, STATS } = Procedure

const makeCamp = new Move({
	title: 'Make Camp',
	text: 
`When you settle in to rest consume a ration.
If you’re somewhere dangerous decide the watch order as well.
If you have enough XP you may level up.
When you wake from at least a few uninterrupted hours of sleep heal damage equal to half your max HP.`,

	procedure: new Procedure('When you settle in to rest', multipleEffects(
		useUpGear(Equipment.RATIONS, 1),
		choice('Are you somewhere dangerous and want to decide on the watch order?', {
			'Yes': 'Decide on the watch order',
			'No': noEffect()
		}),
		condition('xp-level>=7', 'Level up'),
		choice('Did you get at least a few uninterrupted hours of sleep?', {
			'Yes': changeStat(STATS.HP, '+0.5*maxHP'),
			'No': noEffect()
		})))
})

export default makeCamp
