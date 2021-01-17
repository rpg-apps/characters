import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const zukoStyle = new Move({
	title: 'Zuko Style',
	text: 
`When you bend a flame to your will, roll+WIS. On a 10+ it does as you command, taking the shape and movement you desire for as long as it has fuel on which to burn. On a 7-9 the effect is short-lived, lasting only a moment.`,

	procedure: new Procedure('When you bend a flame to your will', roll('roll+Wis', {
		success: 'it does as you command, taking the shape and movement you desire for as long as it has fuel on which to burn',
		partialSuccess: 'the effect is short-lived, lasting only a moment.',
		miss: ''
	}))
})

export default zukoStyle