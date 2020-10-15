import Move, { Procedure } from '../move'

const { choice } = Procedure

const heist = new Move({
	title: 'Heist',
	text: 
`When you take time to make a plan to steal something`,

	procedure: new Procedure('When you take time to make a plan to steal something', name the thing you want to steal and ask the GM these questions)
})

export default heist