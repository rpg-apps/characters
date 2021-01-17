import Move from '../../../move'
import seeingRed from '../advanced_moves_2_5/seeing_red'

import Procedure, { roll, hold } from '../../../move_procedure'

const evilEye = new Move({
	title: 'Evil Eye',
	text: 
`When you enter combat`,

	procedure: new Procedure('When you enter combat', roll('roll+Cha', {
		success: '',
		partialSuccess: '',
		miss: ''
	})),

    requires: seeingRed
})

export default evilEye