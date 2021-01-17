import Move from '../../../move'
import Procedure, { modifier, condition, CONSTANT } from '../../../move_procedure'

const unencomberedUnharmed = new Move({
	title: 'Unencombered Unharmed',
	text: 
`So long as you are below your Load and neither wear armor nor carry a shield, take +1 armor.`,

	procedure: new Procedure(CONSTANT, condition('weight < load && no armor && no shield', modifier('+1 armor', { ongoing: true, forced: true })))
})

export default unencomberedUnharmed