import Move, { Procedure } from '../move'

const { roll, modifier, multipleEffects } = Procedure

const whatAreYouWaitingFor = new Move({
	title: 'What Are You Waiting For',
	text: 
`When you cry out a challenge to your enemies`,

	procedure: new Procedure('When you cry out a challenge to your enemies', roll('roll+Con', {
		success: multipleEffects(
			'They treat you as the most obvious threat to be dealt with and ignore your companions.',
			modifier('+2 damage', { on: 'against them', ongoing: true })),
		partialSuccess: 'Only a few (the weakest or most foolhardy among them) fall prey to your taunting.'
	}))
})

export default whatAreYouWaitingFor