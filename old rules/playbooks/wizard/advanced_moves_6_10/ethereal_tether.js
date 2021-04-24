import Move from '../../../move'
import Procedure from '../../../move_procedure'

const etherealTether = new Move({
	title: 'Ethereal Tether',
	text: 
`When you have time with a willing or helpless subject you can craft an ethereal tether with them. You perceive what they perceive and can discern realities about someone tethered to you or their surroundings no matter the distance. Someone willingly tethered to you can communicate with you over the tether as if you were in the room with them.`,

	procedure: new Procedure('When you have time with a willing or helpless subject', You perceive what they perceive and can discern realities about someone tethered to you or their surroundings no matter the distance. Someone willingly tethered to you can communicate with you over the tether as if you were in the room with them.)
})

export default etherealTether