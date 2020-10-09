import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const healthyDistrust = new Move({
	title: 'Healthy Distrust',
	text: 
`Whenever the unclean magic wielded by mortal men causes you to defy danger, treat any result of 6 as a 7–9.`,

	procedure: new Procedure(CONSTANT, )
})

export default healthyDistrust