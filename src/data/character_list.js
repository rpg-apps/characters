import Character from '../models/character'

const storage = localStorage

export function get (name) {
	return new Character(JSON.parse(storage.getItem(name)))
}

export function getAll () {
	const keys = storage.getAllKeys()
	return keys.map(key => get(key))
}

export function add (character) {
	return storage.setItem(character.name, JSON.stringify(character))
}

export function remove (name) {
	return storage.removeItem(name)
}
