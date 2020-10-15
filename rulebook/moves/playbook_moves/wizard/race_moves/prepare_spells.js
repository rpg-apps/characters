import Move, { Procedure } from '../move'

const { modifier, changeStat, STATS, multipleEffects } = Procedure

const prepareSpells = new Move({
	title: 'Prepare Spells',
	text: 
`When you spend uninterrupted time (an hour or so) in quiet contemplation of your spellbook`,

	procedure: new Procedure('When you spend uninterrupted time (an hour or so) in quiet contemplation of your spellbook', )
})

export default prepareSpells