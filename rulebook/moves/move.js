import Procedure from './move_procedure'

// TODO: replaces, multiclassMove

class Move {
	constructor ({ name, text, procedure, replaces }) {
		this.name = name
		this.text = text
		this.procedure = procedure
		this.replaces = replaces // If the move replaced another move, it will be reference here
	}
}

Object.assign(Move, { Procedure })

export default Move