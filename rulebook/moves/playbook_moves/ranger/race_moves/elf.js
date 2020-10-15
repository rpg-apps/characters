import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const elf = new Move({
	title: 'Elf',
	text: 
`When you undertake a perilous journey through wilderness whatever job you take you succeed as if you rolled a 10+.`,

	procedure: new Procedure(CONSTANT, )
})

export default elf