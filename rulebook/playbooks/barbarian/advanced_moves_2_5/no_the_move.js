import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const noTheMove = new Move({
	title: 'No The Move',
	text: 
`When you defy a danger caused by movement (maybe falling off a narrow bridge or rushing past an armed guard) take +1.`,

	procedure: new Procedure(CONSTANT, )
})

export default noTheMove