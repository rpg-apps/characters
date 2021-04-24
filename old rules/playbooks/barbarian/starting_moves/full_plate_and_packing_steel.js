import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const fullPlateAndPackingSteel = new Move({
	title: 'Full Plate And Packing Steel',
	text: 
`You ignore the clumsy tag on armor you wear.`,

	procedure: new Procedure(CONSTANT, modifier('-clumsy', { ongoing: true }))
})

export default fullPlateAndPackingSteel