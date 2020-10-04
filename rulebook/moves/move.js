import Procedure from './move_procedure'

class Move {
	constructor ({ name, text, procedure }) {
		this.name = name
		this.text = text
		this.procedure = procedure
	}
}

Object.assign(Move, { Procedure })

export default Move