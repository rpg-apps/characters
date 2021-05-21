import Character from '../models/character'

const storage = localStorage
const PREFIX = 'character-'

export function get (name) {
	return new Character(JSON.parse(storage.getItem(`${PREFIX}${name}`)))
}

export function getAll () {
	return Object.keys(storage)
		.filter(key => key.startsWith(PREFIX))
		.map(key => key.replace(PREFIX, ''))
		.map(name => get(name))
}

export function add (character) {
	return storage.setItem(`${PREFIX}${character.name}`, JSON.stringify(character))
}

export function remove (name) {
	return storage.removeItem(`${PREFIX}${name}`)
}
