import Move, { Procedure } from '../move'

const { modifier, condition, CONSTANT, NO_EFFECT } = Procedure

const theUpperHand = new Move({
	title: 'The Upper Hand',
	text: 
`You take +1 ongoing to last breath rolls. When you take your last breath, on a 7–9 you make an offer to Death in return for your life. If Death accepts he will return you to life. If not, you die.`,

	procedure: new Procedure(CONSTANT,
		modifier('+1', {
			on: 'last breath',
			ongoing: true,
			additionalEFfect: condition('last roll > 6 && last roll < 10', 'You make and offer to Death', NO_EFFECT)
		}))
})

export default theUpperHand