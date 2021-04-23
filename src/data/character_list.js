const storage = localStorage

export async function get (name) {
	return storage.getItem(name)
}

export async function getAll () {
	const keys = await storage.getAllKeys()
	return storage.multiGet(keys)
}

export async function add (character) {
	return storage.setItem(character.name, JSON.stringify(character))
}

export async function remove (name) {
	return storage.removeItem(name)
}
