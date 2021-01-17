import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const turnUndead = new Move({
	title: 'Turn Undead',
	text: 
`When you hold your holy symbol aloft and call on your deity for protection`,

	procedure: new Procedure('When you hold your holy symbol aloft and call on your deity for protection', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default turnUndead