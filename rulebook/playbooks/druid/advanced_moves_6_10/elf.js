import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const elf = new Move({
	title: 'Elf',
	text: 
`The sap of the elder trees flows within you. In addition to any other attunements, the Great Forest is always considered your land.`,

	procedure: new Procedure(CONSTANT, )
})

export default elf