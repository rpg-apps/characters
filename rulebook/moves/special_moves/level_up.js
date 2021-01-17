import Move from '../move'
import Procedure, { choice, changeStat, addAdvancedMove, activateClassLevelUpEffects, simultaneous, STATS } from '../move_procedure'

const levelUp = new Move({
	title: 'Level Up',
	text: 
`When you have downtime (hours or days) and XP equal to (or greater than) your current level+7, you can reflect on your experiences and hone your skills.
* Subtract your current level+7 from your XP.
* Increase your level by 1.
* Choose a new advanced move from your class.
* If you are the wizard, you also get to add a new spell to your spellbook.
* Choose one of your stats and increase it by 1 (this may change your modifier). Changing your Constitution increases your maximum and current HP. Ability scores can’t go higher than 18.`,

	procedure: new Procedure('When you have downtime (hours or days) and XP equal to (or greater than) your current level+7', simultaneous(
			changeStat(STATS.XP, '-(level+7)'),
			changeStat(STATS.LVL, 1),
			addAdvancedMove(),
			activateClassLevelUpEffects(),
			choice('Choose one of your stats to increase:' {
				'Strength': changeStat(STATS.STRENGTH, 1),
				'Dexterity': changeStat(STATS.DEXTERITY, 1),
				'Constitution': changeStat(STATS.CONSITUTION, 1),
				'Intelligence': changeStat(STATS.INTELLIGENCE, 1),
				'Wisdom': changeStat(STATS.WISDOM, 1),
				'Charisma': changeStat(STATS.CHRASIMA, 1)
			})
		))
})

export default levelUp