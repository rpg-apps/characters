import Move, { Procedure } from '../move'

const { choice, modifier } = Procedure

const spellAugmentation = new Move({
	title: 'Spell Augmentation',
	text: 
`When you deal damage to a creature you can shunt a spell’s energy into them—end one of your ongoing spells and add the spell’s level to the damage dealt.`,

	procedure: new Procedure('When you deal damage to a creature', you can shunt a spell’s energy into them—end one of your ongoing spells and add the spell’s level to the damage dealt.)
})

export default spellAugmentation