import Move from '../../../move'
import Procedure from '../../../move_procedure'

const disguise = new Move({
	title: 'Disguise',
	text: 
`When you have time and materials you can create a disguise that will fool anyone into thinking you’re another creature of about the same size and shape. Your actions can give you away but your appearance won’t.`,

	procedure: new Procedure('', When you have time and materials,You can create a disguise that will fool anyone into thinking you’re another creature of about the same size and shape. Your actions can give you away but your appearance won’t.)
})

export default disguise