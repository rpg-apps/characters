import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const thisKillingFire = new Move({
	title: 'This Killing Fire',
	text: 
`Add the following tags to your options for Burning Brand: messy, forceful, reach, near, far`,

	procedure: new Procedure(CONSTANT, )
})

export default thisKillingFire