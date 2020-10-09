import Move, { Procedure } from '../move'

const { roll } = Procedure

const forTheBloodGod = new Move({
	title: 'For The Blood God',
	text: 
`When you sacrifice those things as per your rites and rituals`,

	procedure: new Procedure('When you sacrifice those things as per your rites and rituals', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default forTheBloodGod