import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const chimera = new Move({
	title: 'Chimera',
	text: 
`When you shapeshift, you may create a merged form of up to three different shapes. You may be a bear with the wings of an eagle and the head of a ram, for example. Each feature will grant you a different move to make. Your chimera form follows the same rules as shapeshifter otherwise.`,

	procedure: new Procedure(CONSTANT, )
})

export default chimera