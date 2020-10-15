import Move, { Procedure } from '../move'

const { choice, modifier, CONSTANT } = Procedure

const followMe = new Move({
	title: 'Follow Me',
	text: 
`When you undertake a perilous journey you can take two roles. You make a separate roll for each.`,

	procedure: new Procedure(CONSTANT, )
})

export default followMe