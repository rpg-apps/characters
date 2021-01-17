import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const mothToTheFlame = new Move({
	title: 'Moth To The Flame',
	text: 
`When you tempt a weak mind with your inner fire, roll+WIS. On a 10+ their will is suppressed, they’ll follow you and do as you desire, so long as nothing startles or surprises them. On a 7-9, the effect is only strong enough to distract or confuse them. On a miss, they become agitated and upset, your fire having sparked their hidden desires.`,

	procedure: new Procedure('When you tempt a weak mind with your inner fire', roll('roll+Wis', {
		success: 'Their will is suppressed, they’ll follow you and do as you desire, so long as nothing startles or surprises them.',
		partialSuccess: 'The effect is only strong enough to distract or confuse them.',
		miss: 'They become agitated and upset, your fire having sparked their hidden desires.'
	}))
})

export default mothToTheFlame