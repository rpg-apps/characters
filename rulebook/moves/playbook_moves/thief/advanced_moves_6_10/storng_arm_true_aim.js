import Move, { Procedure } from '../move'

const { CONSTANT } = Procedure

const storngArmTrueAim = new Move({
	title: 'Storng Arm True Aim',
	text: 
`You can throw any melee weapon, using it to volley. A thrown melee weapon is gone; you can never choose to reduce ammo on a 7–9.`,

	procedure: new Procedure(CONSTANT, You can throw any melee weapon, using it to volley. A thrown melee weapon is gone; you can never choose to reduce ammo on a 7–9.)
})

export default storngArmTrueAim