import Move from '../../../move'
import Procedure from '../../../move_procedure'

const camouflage = new Move({
	title: 'Camouflage',
	text: 
`When you keep still in natural surroundings, enemies never spot you until you make a movement.`,

	procedure: new Procedure('When you keep still in natural surroundings', Enemies never spot you until you make a movement.)
})

export default camouflage