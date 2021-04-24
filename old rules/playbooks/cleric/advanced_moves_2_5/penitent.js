import Move from '../../../move'
import Procedure, { choice, modifier } from '../../../move_procedure'

const penitent = new Move({
	title: 'Penitent',
	text: 
`When you take damage and embrace the pain, you may take +1d4 damage (ignoring armor). If you do, take +1 forward to cast a spell.`,

	procedure: new Procedure('When you take damage and embrace the pain', )
})

export default penitent