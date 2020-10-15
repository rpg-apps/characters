import Move, { Procedure } from '../move'

const { roll, choice, multipleEffects } = Procedure

const throughDeathsEyes = new Move({
	title: 'Through Deaths Eyes',
	text: 
`When you go into battle`,

	procedure: new Procedure('When you go into battle', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default throughDeathsEyes