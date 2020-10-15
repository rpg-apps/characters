import Move, { Procedure } from '../move'

const { roll, choice, multipleEffects } = Procedure

const calledShot = new Move({
	title: 'Called Shot',
	text: 
`When you attack a defenseless or surprised enemy at range`,

	procedure: new Procedure('When you attack a defenseless or surprised enemy at range', roll('roll+Dex', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default calledShot