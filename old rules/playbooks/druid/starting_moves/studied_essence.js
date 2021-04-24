import Move from '../../../move'
import Procedure from '../../../move_procedure'

const studiedEssence = new Move({
	title: 'Studied Essence',
	text: 
`When you spend time in contemplation of an animal spirit, you may add its species to those you can assume using shapeshifting.`,

	procedure: new Procedure('When you spend time in contemplation of an animal spirit', Add it to the species you can assume using shapeshifting)
})

export default studiedEssence