import Move from '../../../move'
import Procedure from '../../../move_procedure'

const brewer = new Move({
	title: 'Brewer',
	text: 
`When you have time to gather materials and a safe place to brew you can create three doses of any one poison you’ve used before.`,

	procedure: new Procedure('When you have time to gather materials and a safe place to brew', You can create three doses of any one poison you’ve used before.)
})

export default brewer