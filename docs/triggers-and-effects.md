# Triggers & Effects
Each move in the game is built of two parts: a trigger and an effect.

## Triggers
A trigger is the event that causes the move to happen.
It is usually stated as "When something happens...".

### Automatic triggers
Some triggers you want to occour automatically.
In these cases you can use [formulas]() that will constantly check for the moves to happen.

## Effects
An effect is the event that the moves causes.
Effects can be linked together in a series of logical and human based descisions.

### End effects
End effects are effects that have nothing following them.
These are the effects:
 - **Text**: show text to the player.
 - **Change**: Permanent change in the character (that can be changed with another move or manually).
 - **Modify**: Temporary change to rolls or other moves.

### Intermediate effects
Intermediate effects are effexts that cause other effects.
These are the effects:
 - **Roll**: roll by formula and act based on result
 - **Choice**: Choose an option and act accordingly
 - **Trigger**: trigger another move
 - **Condition**: trigger other effects depending on the result of a logical condition.