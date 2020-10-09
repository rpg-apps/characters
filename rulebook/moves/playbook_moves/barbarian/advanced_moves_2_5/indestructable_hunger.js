import Move, { Procedure } from '../move'

const { choice, modifier } = Procedure

const indestructableHunger = new Move({
	title: 'Indestructable Hunger',
	text: 
`When you take damage you can choose to take 1 ongoing until you sate one of your appetites instead of taking the damage. If you already have this penalty you cannot choose this option.`,

	procedure: new Procedure('When you take damage', )
})

export default indestructableHunger