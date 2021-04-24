import Move from '../../../move'
import Procedure from '../../../move_procedure'

const giveMeFuelGiveMeFire = new Move({
	title: 'Give Me Fuel Give Me Fire',
	text: 
`When you gaze intensely into someone eyes, you may ask their player “what fuels the flames of your desire?” they’ll answer with the truth, even if the character does not know or would otherwise keep this hidden.`,

	procedure: new Procedure('When you gaze intensely into someone eyes', ask their player "what fuels the flames of your desire?" they’ll answer with the truth, even if the character does not know or would otherwise keep this hidden.)
})

export default giveMeFuelGiveMeFire