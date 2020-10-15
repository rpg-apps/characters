import Move, { Procedure } from '../move'

const { choice, modifier } = Procedure

const penitent = new Move({
	title: 'Penitent',
	text: 
`When you take damage and embrace the pain, you may take +1d4 damage (ignoring armor). If you do, take +1 forward to cast a spell.`,

	procedure: new Procedure('When you take damage and embrace the pain', )
})

export default penitent