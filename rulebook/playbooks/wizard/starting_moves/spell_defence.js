import Move from '../../../move'
import Procedure from '../../../move_procedure'

const spellDefence = new Move({
	title: 'Spell Defence',
	text: 
`You may end any ongoing spell immediately and use the energy of its dissipation to deflect an oncoming attack. The spell ends and you subtract its level from the damage done to you.`,

	procedure: new Procedure('When you choose to end an ongoing spell and use the energy of its dissipation to deflect an oncoming attack.', The spell ends and you subtract its level from the damage done to you.)
})

export default spellDefence