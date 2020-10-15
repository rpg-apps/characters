import Move, { Procedure } from '../move'

const { roll } = Procedure

const connections = new Move({
	title: 'Connections',
	text: 
`When you put out word to the criminal underbelly about something you want or need`,

	procedure: new Procedure('When you put out word to the criminal underbelly about something you want or need', roll('roll+Cha', {
		success: 'Someone has it, just for you.',
		partialSuccess: 'You’ll have to settle for something close or it comes with strings attached, your call.',
		miss: ''
	}))
})

export default connections