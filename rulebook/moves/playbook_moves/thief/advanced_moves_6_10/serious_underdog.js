import Move, { Procedure } from '../move'
import underdog from '../advanced_moves_2_5/underdog'

const { modifier, condition, CONSTANT } = Procedure

const seriousUnderdog = new Move({
	title: 'Serious Underdog',
	text: 
`You have +1 armor. When you’re outnumbered, you have +2 armor instead.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: underdog
})

export default seriousUnderdog