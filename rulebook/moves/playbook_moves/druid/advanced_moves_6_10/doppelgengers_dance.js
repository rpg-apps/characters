import Move, { Procedure } from '../move'

const { choice, modifier } = Procedure

const doppelgengersDance = new Move({
	title: 'Doppelgengers Dance',
	text: 
`You are able to study the essence of specific individuals to take their exact form, including men, elves, or the like. Suppressing your tell is possible, but if you do, take -1 ongoing until you return to your own form.`,

	procedure: new Procedure('', )
})

export default doppelgengersDance