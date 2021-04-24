import Move from '../../../move'
import Procedure, { choice, modifier } from '../../../move_procedure'

const indestructableHunger = new Move({
	title: 'Indestructable Hunger',
	text: 
`When you take damage you can choose to take 1 ongoing until you sate one of your appetites instead of taking the damage. If you already have this penalty you cannot choose this option.`,

	procedure: new Procedure('When you take damage', choice('Take 1'))
})

export default indestructableHunger