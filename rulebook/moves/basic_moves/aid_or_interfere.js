import Move, { Procedure } from '../move'

const { roll, choice, effect, multipleEffects } = Procedure

const success = choice('Choose wether they take +1 or -2', {
	'They take +1': effect('They take +1'),
	'They take -2': effect('They take -2')
})

const aidOrInterfere = new Move({
	title: 'Aid or Interfere',
	text: 
`When you help or hinder someone you have a bond with, roll+Bond with them.
* On a 10+ they take +1 or -2, your choice. 
* On a 7–9 you also expose yourself to danger, retribution, or cost.`,

	procedure: new Procedure('When you help or hinder someone you have a bond with', roll('roll+bond', {
		success,
		partialSuccess: multipleEffects(success, effect('you also expose yourself to danger, retribution, or cost.'))
	}))
})

export default aidOrInterfere