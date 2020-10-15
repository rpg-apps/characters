import Move, { Procedure } from '../move'

const { choice, modifier } = Procedure

const dwarf = new Move({
	title: 'Dwarf',
	text: 
`When you share a drink with someone, you may parley with them using CON instead of CHA.`,

	procedure: new Procedure('When you share a drink with someone', )
})

export default dwarf