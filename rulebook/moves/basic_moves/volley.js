import Move from '../move'
import Equipment from '../../equipment'
import Procedure, { roll, simultaneous, doDamage, useGear } from '../move_procedure'

const volley = new Move({
	title: 'Volley',
	text: 
`When you take aim and shoot at an enemy at range, roll+Dex.
* On a 10+, you have a clear shot — deal your damage.
* On a 7–9, choose one (whichever you choose you deal your damage):
	* You have to move to get the shot placing you in danger as described by the GM.
	* You have to take what you can get: -1d6 damage.
	* You have to take several shots, reducing your ammo by one.`,

	procedure: new Procedure('When you take aim and shoot at an enemy at range', roll('roll+Dex', {
		success: doDamage(),
		partialSuccess: choice('Choose one', {
			'You have to move to get the shot, placing you in danger as described by the GM.': simultaneous(doDamage(), 'You are in danger as described by the GM.'),
			'You have to take what you can get: -1d6 damage.': doDamate('-1d6'),
			'You have to take several shots, reducing your ammo by one.': simultaneous(doDamage(), useGear(Equipment.BUNDLE_OF_ARROWS, 1))
		})
	}))
})

export default volley