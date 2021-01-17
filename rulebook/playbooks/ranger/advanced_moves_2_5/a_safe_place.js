import Move from '../../../move'
import Procedure, { modifier, simultaneous } from '../../../move_procedure'

const aSafePlace = new Move({
	title: 'A Safe Place',
	text: 
`When you set the watch for the night, everyone takes +1 to take watch.`,

	procedure: new Procedure('When you set the watch for the night', )
})

export default aSafePlace