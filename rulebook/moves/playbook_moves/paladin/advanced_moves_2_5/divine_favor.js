import Move, { Procedure } from '../move'

const { multiclass } = Procedure

const divineFavor = new Move({
	title: 'Divine Favor',
	text: 
`Dedicate yourself to a deity (name a new one or choose one that’s already been established). You gain the commune and cast a spell cleric moves. When you select this move, treat yourself as a cleric of level 1 for using spells. Every time you gain a level thereafter, increase your effective cleric level by 1.`,

	procedure: new Procedure('', multiclass())
})

export default divineFavor