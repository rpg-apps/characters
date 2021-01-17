import Move from '../../../move'
import Procedure from '../../../move_procedure'

const charge = new Move({
	title: 'Charge',
	text: 
`When you lead the charge into combat, those you lead take +1 forward.`,

	procedure: new Procedure('When you lead the charge into combat', those you lead take +1 forward.)
})

export default charge