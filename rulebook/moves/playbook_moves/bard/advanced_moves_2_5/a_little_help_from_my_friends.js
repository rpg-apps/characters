import Move, { Procedure } from '../move'

const { modifier } = Procedure

const aLittleHelpFromMyFriends = new Move({
	title: 'A Little Help From My Friends',
	text: 
`When you successfully aid someone you take +1 forward as well.`,

	procedure: new Procedure('When you successfully aid someone', modifier('+1', { usages: 1 }))
})

export default aLittleHelpFromMyFriends