import Move, { Procedure } from '../move'

const { modifier } = Procedure

const myLoveForYouIsLikeATruck = new Move({
	title: 'My Love For You Is Like A Truck',
	text: 
`When you perform a feat of strength, name someone present whom you have impressed and take +1 forward to parley with them.`,

	procedure: new Procedure('When you perform a feat of strength', )
})

export default myLoveForYouIsLikeATruck