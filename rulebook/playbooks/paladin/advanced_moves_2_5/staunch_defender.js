import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const staunchDefender = new Move({
	title: 'Staunch Defender',
	text: 
`When you defend you always get +1 hold, even on a 6-.`,

	procedure: new Procedure(CONSTANT, )
})

export default staunchDefender