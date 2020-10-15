import Move, { Procedure } from '../move'

const { roll, choice, modifier, multipleEffects } = Procedure

const iAmTheLaw = new Move({
	title: 'I Am The Law',
	text: 
`When you give an NPC an order based on your divine authority`,

	procedure: new Procedure('When you give an NPC an order based on your divine authority', roll('roll+Cha', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default iAmTheLaw