import Move from '../../../move'
import Procedure, { roll, choice, modifier } from '../../../move_procedure'

const warCry = new Move({
	title: 'War Cry',
	text: 
`When you enter battle with a show of force (a shout, a rallying cry, a battle dance)`,

	procedure: new Procedure('When you enter battle with a show of force (a shout, a rallying cry, a battle dance)', roll('roll+Cha', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default warCry