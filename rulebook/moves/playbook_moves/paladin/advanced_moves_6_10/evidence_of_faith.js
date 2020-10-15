import Move, { Procedure } from '../move'
import divineFavor from '../advanced_moves_2_5/divine_favor'

const { modifier, multipleEffects } = Procedure

const evidenceOfFaith = new Move({
	title: 'Evidence Of Faith',
	text: 
`When you see divine magic as it happens, you can ask the GM which deity granted the spell and its effects. Take +1 when acting on the answers.`,

	procedure: new Procedure('When you see divine magic as it happens', ),

    requires: divineFavor
})

export default evidenceOfFaith