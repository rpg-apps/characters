class Move {
	constructor (text) {
		this.text = text
	}
}

Move.Static = class StaticMove extends Move {
	constructor (text, modifiers) {
		super(text)
		this.modifiers = modifiers
	}
}

Move.Triggered = class TriggeredMove extends Move {
	constructor (trigger, startingNode) {
		super(trigger)
		this.startingNode = startingNode
	}
}

Move.Triggered.Node = class TriggeredMoveNode {
	constructor (text) {
		this.text = text
	}
}

Move.Triggered.Node.Result = class TriggeredMoveResultNode extends Move.Triggered.Node { }

Move.Triggered.Node.Result.Modifier = class TriggeredMoveModifierResultNode extends Move.Triggered.Node.Result {
	constructor (text, modifiers) {
		super(text)
		this.modifiers = modifiers
	}
}

Move.Triggered.Node.Choice = class TriggeredMoveChoiceNode extends Move.Triggered.Nodes {
	constructor (choice, options, count = 1) {
		super(choice)
		this.options = options
		this.count = count
	}
}

Move.Triggered.Node.Roll = class TriggeredMoveRollNode extends Move.Triggered.Node {
	constructor (roll, results) {
		super(roll)
		this.roll = roll
		this.results = results
	}
}

Move.Triggered.Node.Roll.Classic = class TriggeredMoveClassicRollNode extends Move.Triggered.Node.Roll {
	constructor (roll, onSuccess, onPartialSuccess, onMiss) {
		super(roll, result => {
			if (result <= 6) {
				return onMiss
			} else if (result <= 9) {
				return onPartialSuccess
			} else {
				return onSuccess
			}
		})
	}
}

Move.Triggered.Node.And = class TriggeredMoveAndNode extends Move.Triggered.Node {
	constructor (node1, node2) {
		this.node1 = node1
		this.node2 = node2
	}
}

Move.Modifier = class Modifier {
	constructor (nodes, change) {
		this.nodes = nodes
		this.change = change // acts differently on different nodes. On roll nodes changes the roll. On text nodes replaces the text. On choice nodes adds choices.
	}
}

export default Move
