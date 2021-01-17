import Move from '../../../move'
import Procedure from '../../../move_procedure'

const flexibleMorals = new Move({
	title: 'Flexible Morals',
	text: 
`When someone tries to detect your alignment you can tell them any alignment you like.`,

	procedure: new Procedure('When someone tries to detect your alignment', You can tell them any alignment you like.)
})

export default flexibleMorals