import Move from '../move'

const hackAndSlash = new Move.Triggered('When you attack an enemy in melee',
	new Move.Triggered.Node.Roll.classic('roll+Str',
		Move.Triggered.Node.Choice('you may choose to do +1d6 damage but expose yourself to the enemy’s attack', [
			Move.Triggered.Node.Result('')])))