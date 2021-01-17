import Move from '../../../move'
import Procedure, { choice, modifier } from '../../../move_procedure'

const spellAugmentation = new Move({
	title: 'Spell Augmentation',
	text: 
`When you deal damage to a creature you can shunt a spell’s energy into them—end one of your ongoing spells and add the spell’s level to the damage dealt.`,

	procedure: new Procedure('When you deal damage to a creature', you can shunt a spell’s energy into them—end one of your ongoing spells and add the spell’s level to the damage dealt.)
})

export default spellAugmentation