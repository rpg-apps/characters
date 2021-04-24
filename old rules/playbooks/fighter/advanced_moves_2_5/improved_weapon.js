import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const improvedWeapon = new Move({
	title: 'Improved Weapon',
	text: 
`Choose one extra enhancement for your signature weapon.`,

	procedure: new Procedure(CONSTANT, )
})

export default improvedWeapon