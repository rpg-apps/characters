import Move, { Procedure } from '../move'

const {  } = Procedure

const eyeForWeaponary = new Move({
	title: 'Eye For Weaponary',
	text: 
`When you look over an enemy’s weaponry, ask the GM how much damage they do.`,

	procedure: new Procedure('When you look over an enemy’s weaponry', Ask the GM how much damage they do.)
})

export default eyeForWeaponary