import Move, { Procedure } from '../move'

const { roll, choice } = Procedure

const elementalMastery = new Move({
	title: 'Elemental Mastery',
	text: 
`When you call on the primal spirits of fire, water, earth or air to perform a task for you`,

	procedure: new Procedure('When you call on the primal spirits of fire, water, earth or air to perform a task for you', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default elementalMastery