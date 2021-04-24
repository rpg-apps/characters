import Move from '../../../move'
import Procedure from '../../../move_procedure'

const halfElven = new Move({
	title: 'Half Elven',
	text: 
`Somewhere in your lineage lies mixed blood and it begins to show its presence. You gain the elf starting move if you took the human one at character creation or vice versa.`,

	procedure: new Procedure('', )
})

export default halfElven