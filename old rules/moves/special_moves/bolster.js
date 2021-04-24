import Move from '../move'
import Procedure, { choice, hold, modifier } from '../move_procedure'

const preparation = [modifier('+1', { usages: 1 })]

const bolster = new Move({
	title: 'Bolster',
	text: 
`When you spend your leisure time in study, meditation, or hard practice, you gain preparation.
* If you prepare for a week or more, take 1 preparation.
* If you prepare for a month or longer, take 3 instead.
When your preparation pays off spend 1 preparation for +1 to any roll. You can only spend one preparation per roll.`,

	procedure: new Procedure('When you spend your leisure time in study, meditation, or hard practice', choice('If you prepare for', {
		'Between a week and a month': hold(1, preparation),
		'More then a month': hold(3, preparation)
	}))
})

export default bolster