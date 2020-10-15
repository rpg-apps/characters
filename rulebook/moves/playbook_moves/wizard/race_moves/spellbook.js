import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const spellbook = new Move({
	title: 'Spellbook',
	text: 
`You have mastered several spells and inscribed them in your spellbook. You start out with three first level spells in your spellbook as well as the cantrips. Whenever you gain a level, you add a new spell of your level or lower to your spellbook. You spellbook is 1 weight.`,

	procedure: new Procedure(CONSTANT, )
})

export default spellbook