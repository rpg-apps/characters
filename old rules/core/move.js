class BasicMove {
	constructor({ name, text }) {
	  Object.assign(this, { name, text })
	}
}

class Move extends BasicMove {
	constructor ({ name, text, procedure, replaces, requires }) {
		super({ name, text })
		Object.assign(this, { procedure, replaces, requires })
	}
}

// Multilclass moves are a spcecial kind of move that allows you to chose from another class
Move.Multiclass = class MulticlassMove extends BasicMove {
	constructor ({ name, text, classRestrictions, levelRestrictions }) {
		super({ name, text })
		Object.assing(this, { classRestrictions, levelRestrictions })
	}
}

Move.BasicMove = BasicMove

export default Move