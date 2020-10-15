import Move, { Procedure } from '../move'

const { roll, multipleEffects } = Procedure

const escapeRoute = new Move({
	title: 'Escape Route',
	text: 
`When you’re in too deep and need a way out`,

	procedure: new Procedure('When you’re in too deep and need a way out', roll('roll+Dex', {
		success: 'You're gone',
		partialSuccess: 'You can stay or go, but if you go it costs you: leave something behind or take something with you, the GM will tell you what.',
		miss: ''
	}))
})

export default escapeRoute