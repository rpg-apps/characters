import Move from '../../../move'
import Procedure from '../../../move_procedure'

const eyesOfTheTiger = new Move({
	title: 'Eyes Of The Tiger',
	text: 
`When you mark an animal (with mud, dirt, or blood) you can see through that animal’s eyes as if they were your own, no matter what distance separates you. Only one animal at a time may be marked in this way.`,

	procedure: new Procedure('When you mark an animal (with mud, dirt, or blood)', You can see through that animal’s eyes as if they were your own, no matter what distance separates you. Only one animal at a time may be marked in this way.)
})

export default eyesOfTheTiger