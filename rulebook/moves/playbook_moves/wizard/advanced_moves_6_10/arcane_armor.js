import Move, { Procedure } from '../move'
import arcaneWard from '../advanced_moves_2_5/arcane_ward'

const { modifier, condition, CONSTANT } = Procedure

const arcaneArmor = new Move({
	title: 'Arcane Armor',
	text: 
`As long as you have at least one prepared spell of first level or higher, you have +4 armor.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: arcaneWard
})

export default arcaneArmor