class Move {
	constructor ({ name, text, procedure, replaces, requires }) {
		this.name = name
		this.text = text
		this.procedure = procedure
		this.replaces = replaces // If the move replaces another move, it will be reference here
		this.requires = requires // If the move requires another move, it will be reference here
	}
}

// Multilclass moves are a spcecial kind of move that allows you to chose from another class
Move.Multiclass = class MulticlassMove extends Move {
	constructor ({ name, text, classRestrictions, levelRestrictions }) {
		super({ name, text })
		Object.assing(this, { classRestrictions, levelRestrictions })
	}
}

export default Move