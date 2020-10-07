import Move, { Procedure } from '../move'

const { modifier } = Procedure

const unforgettableFace = new Move({
	title: 'Unforgettable Face',
	text: 
`When you meet someone you’ve met before (your call) after some time apart you take +1 forward against them.`,

	procedure: new Procedure('When you meet someone you’ve met before (your call) after some time apart', modifier('+1', { on: 'against them', usgaes: 1 }))
})

export default unforgettableFace