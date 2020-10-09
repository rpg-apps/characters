import Move, { Procedure } from '../move'

const {  } = Procedure

const wideWanderer = new Move({
	title: 'Wide Wanderer',
	text: 
`You’ve traveled the wide world over. When you arrive someplace ask the GM about any important traditions, rituals, and so on, they’ll tell you what you need to know.`,

	procedure: new Procedure('When you arrive someplace', ask the GM about any important traditions, rituals, and so on, they’ll tell you what you need to know.)
})

export default wideWanderer