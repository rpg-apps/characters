import Move from '../../../move'
import Procedure from '../../../move_procedure'

const selfPowered = new Move({
	title: 'Self Powered',
	text: 
`When you have time, arcane materials, and a safe space, you can create your own place of power. Describe to the GM what kind of power it is and how you’re binding it to this place, the GM will tell you one kind of creature that will have an interest in your workings.`,

	procedure: new Procedure('When you have time, arcane materials, and a safe space', You can create your own place of power. Describe to the GM what kind of power it is and how you’re binding it to this place, the GM will tell you one kind of creature that will have an interest in your workings.)
})

export default selfPowered