import Move, { Procedure } from '../../../move'

const { modifier, CONSTANT } = Procedure

const duelistsParry = new Move({
	title: 'Duelist’s Parry',
	text: 
`When you hack and slash, you take +1 armor forward.`,

	procedure: new Procedure(CONSTANT, modifier('+1 armor', { on: 'after hack and slash', usages: 1, forced: true }))
})

export default duelistsParry