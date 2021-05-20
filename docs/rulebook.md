# The rulebook

## What is the rulebook?
The rulebook infastructure meant to automize the rules of the game. That wat the main concepts and procedures of the game are integrated into the software and can be ran automatically.

## Structure
The rulebook is seperated into *moves*, *playbooks* and *mechanisms*.
The *moves* are used in-game.
The *playbooks* are used for the construction of characters.
The *mechanisms* are the core rules of the game. The game is built entirely from mechanisms that interact with the *rules* and the *playbooks*.

### Moves
*Moves* are actions that characters can take whilst in the game.
Every move starts with a *trigger*, and ends with an *effect*.
You can read more in [triggers and effects]().

### Playbook and Characters
*Playbooks* contain a list of fields that characters starts with, and their initial values.
*Characters* on the other hand, contains those fields including any changes that could have been done to them.

For instance, if the *damage* field in a *playbook* is d6, it means that the character starts with a field *damage* with the value d6. During the game these values can change.
Think about *playbooks* as prototypes for characters.

### Mechanisms
*Mechanisms* describe rules of the game that are behond *moves* or *playbooks*.
Each mechanism conatins:
- A list of added types of data to consider.
- A list of global constant fields and their values.
- A list of playbook fields and their default values.
- A list of choices needs to be made in the character creation process. There maybe other choices from other sources, these are just the choices that reference more then one field in the mechanism.
- A list of character fields and their default values (Can be overriden by the playbooks).
- A list of formula shorthands.
- A list of move effects shorthands.

Notice: most fields in a playbook are derived from mechanisms, meaning they can be replaced. The only fields that cannot be changed are:
- "moves" field, which includes all the moves that character can perform

## Large global fields
If an additional field is in the root of the rulebook, and its name matches one of the global fields in one of the mechanisms, and the type of the global field is declared as "large", the mechanisms global field will be set to the field in the root of the rulebook with the same name.

## Extensions
Extensions may add as much of any of those three (*moves*, *playbooks* and *mechanisms*), and/or exlude any existing ones.
You can see the list of core *moves*, *playbooks* and *mechanisms* in [The core rules]()