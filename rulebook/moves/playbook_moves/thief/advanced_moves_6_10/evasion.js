import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const evasion = new Move({
	title: 'Evasion',
	text: 
`When you defy danger on a 12+, you transcend the danger. You not only do what you set out to, but the GM will offer you a better outcome, true beauty, or a moment of grace.`,

	procedure: new Procedure(CONSTANT, )
})

export default evasion