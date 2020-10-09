import Move, { Procedure } from '../move'

const { CONSTANT } = Procedure

const markOfMight = new Move({
	title: 'Mark Of Might',
	text: 
`When you take this move and spend some uninterrupted time reflecting on your past glories you may mark yourself with a symbol of your power (a long braid tied with bells, ritual scars or tattoos, etc.) Any intelligent mortal creature who sees this symbol knows instinctively that you are a force to be reckoned with and treats you appropriately.`,

	procedure: new Procedure(CONSTANT, Any intelligent mortal creature knows instinctively that you are a force to be reckoned with and treats you appropriately.)
})

export default markOfMight