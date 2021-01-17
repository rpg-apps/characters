import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const khanOfKhan = new Move({
	title: 'Khan Of Khan',
	text: 
`Your hirelings always accept the gratuitous fulfillment of one of your appetites as payment.`,

	procedure: new Procedure(CONSTANT, )
})

export default khanOfKhan