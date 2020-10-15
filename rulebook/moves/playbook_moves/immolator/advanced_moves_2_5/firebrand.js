import Move, { Procedure } from '../move'

const { roll } = Procedure

const firebrand = new Move({
	title: 'Firebrand',
	text: 
`When you introduce a new idea to an NPC, roll+CHA. On a 10+ They believe the idea to be their own and take to it with fervor On a 7-9, Their passion fades after a day or two. On a miss, they respond negatively, speaking out against the idea.`,

	procedure: new Procedure('When you introduce a new idea to an NPC', roll('roll+Cha', {
		success: ' They believe the idea to be their own and take to it with fervor',
		partialSuccess: 'heir passion fades after a day or two',
		miss: 'On a miss, they respond negatively, speaking out against the idea.'
	}))
})

export default firebrand