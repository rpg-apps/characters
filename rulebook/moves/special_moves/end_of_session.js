import Move from '../move'
import Procedure, { choice, changeStat, series, NO_EFFECT, resolveBond, createBond, STATS } from '../move_procedure'

const endOfSession = new Move({
	title: 'End Of Session',
	text: 
`When you reach the end of a session, choose one of your bonds that you feel is resolved (completely explored, no longer relevant, or otherwise). Ask the player of the character you have the bond with if they agree. If they do, mark XP and write a new bond with whomever you wish.

Once bonds have been updated look at your alignment. If you fulfilled that alignment at least once this session, mark XP. Then answer these three questions as a group:
* Did we learn something new and important about the world?
* Did we overcome a notable monster or enemy?
* Did we loot a memorable treasure?
For each “yes” answer everyone marks XP.`,

	procedure: new Procedure('When you reach the end of a session', series(
			choice('Choose one of your bonds that you feel is resolved (completely explored, no longer relevant, or otherwise). Ask the player of the character you have the bond with if they agree. If they do, mark XP and write a new bond with whomever you wish.', {
				'Resolve a bond': series(resolveBond(), changeStat(STATS.XP, 1), createBond()),
				'Create a new bond': createBond(),
				'Do not resolve a bond': NO_EFFECT
			}),
			choice('Did I fulfill my alignemnt goal?', { 'Yes': changeStat(STATS.XP, 1), 'No': NO_EFFECT }),
			choice('Did we learn something new and important about the world?', { 'Yes': changeStat(STATS.XP, 1), 'No': NO_EFFECT }),
			choice('Did we overcome a notable monster or enemy?', { 'Yes': changeStat(STATS.XP, 1), 'No': NO_EFFECT }),
			choice('Did we loot a memorable treasure?', { 'Yes': changeStat(STATS.XP, 1), 'No': NO_EFFECT })
		))
})

export default endOfSession
