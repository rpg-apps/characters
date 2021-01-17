import Move from '../../../move'
import Procedure from '../../../move_procedure'

const weatherWeaver = new Move({
	title: 'Weather Weaver',
	text: 
`When you are under open skies when the sun rises the GM will ask you what the weather will be that day. Tell them whatever you like, it comes to pass.`,

	procedure: new Procedure('When you are under open skies when the sun rises', The GM will ask you what the weather will be that day. Tell them whatever you like, it comes to pass.)
})

export default weatherWeaver