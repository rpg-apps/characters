import Move, { Procedure } from '../move'

const { modifier } = Procedure

const envenom = new Move({
	title: 'Envenom',
	text: 
`You can apply even complex poisons with a pinprick. When you apply a poison that’s not dangerous for you to use to your weapon it’s touch instead of applied.`,

	procedure: new Procedure('When you apply a poison that’s not dangerous for you to use to your weapon', )
})

export default envenom