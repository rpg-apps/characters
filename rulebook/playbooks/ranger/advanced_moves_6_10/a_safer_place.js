import Move from '../../../move'
import aSafePlace from '../advanced_moves_2_5/a_safe_place'

import Procedure, { modifier, simultaneous } from '../../../move_procedure'

const aSaferPlace = new Move({
	title: 'A Safer Place',
	text: 
`When you set the watch for the night everyone takes +1 to take watch. After a night in camp when you set the watch everyone takes +1 forward.`,

	procedure: new Procedure('When you set the watch for the night', ),

    replaces: aSafePlace
})

export default aSaferPlace