import Move, { Procedure } from '../move'

const { roll, choice, modifier, NO_EFFECT, multipleEffects } = Procedure

const recruit = new Move({
	title: 'Recruit',
	text: 
`When you put out word that you’re looking to hire help, roll:
* +1 if you make it known that your pay is generous
* +1 if you make it known what you’re setting out to do
* +1 if you make it known that they’ll get a share of whatever you find
* +1 if you have a useful reputation around these parts

* On a 10+, you’ve got your pick of a number of skilled applicants, your choice who you hire, no penalty for not taking them along.
* On a 7–9, you’ll have to settle for someone close to what you want or turn them away.
* On a miss someone influential and ill-suited declares they’d like to come along (a foolhardy youth, a loose-cannon, or a veiled enemy, for example), bring them and take the consequences or turn them away. If you turn away applicants you take -1 forward to recruit.`,

	procedure: new Procedure('When you put out word that you’re looking to hire help', multipleEffects(
			choice('Do you make it known that your pay is generous?', { 'Yes': modifier('+1', { forced: true, usages: 1 }), 'No': NO_EFFECT }),
			choice('Do you make it known what you’re setting out to do?', { 'Yes': modifier('+1', { forced: true, usages: 1 }), 'No': NO_EFFECT }),
			choice('Do you make it known that they’ll get a share of whatever you find?', { 'Yes': modifier('+1', { forced: true, usages: 1 }), 'No': NO_EFFECT }),
			choice('Do you have a useful reputation around these parts?', { 'Yes': modifier('+1', { forced: true, usages: 1 }), 'No': NO_EFFECT }),
			roll('roll', {
				success: 'you’ve got your pick of a number of skilled applicants, your choice who you hire, no penalty for not taking them along.',
				partialSuccess: 'you’ll have to settle for someone close to what you want or turn them away.',
				miss: multipleEffects(
					'On a miss someone influential and ill-suited declares they’d like to come along (a foolhardy youth, a loose-cannon, or a veiled enemy, for example), bring them and take the consequences or turn them away. If you turn away applicants you take -1 forward to recruit.',
					choice('Bring them along or turn them away?', {
						'Bring them along',
						'Turn them away': modifier(-1, { on: 'recruit', usages: 1, forced: true })
					}))
			})
		))
})

export default recruit