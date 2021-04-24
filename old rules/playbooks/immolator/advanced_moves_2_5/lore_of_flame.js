import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const loreOfFlame = new Move({
	title: 'Lore Of Flame',
	text: 
`When you stare into a source of fire, looking for answers, roll+WIS On a hit, the GM will tell you something new and interesting about the current situation. On a 10+, the GM will give you good detail. On a 7–9, the GM will give you an impression. If you already know all there is to know, the GM will tell you that.`,

	procedure: new Procedure('When you stare into a source of fire, looking for answers', roll('roll+Wis', {
		success: 'The GM will give you good detail.',
		partialSuccess: 'The GM will give you an impression.',
		miss: ''
	}))
})

export default loreOfFlame