import AsyncStorage from '@react-native-community/async-storage'

export async function get (name) {
	return AsyncStorage.getItem(name)
}

export async function getAll () {
	const keys = await AsyncStorage.getAllKeys()
	return AsyncStorage.multiGet(keys)
}

export async function add (character) {
	return AsyncStorage.setItem(character.name, JSON.stringify(character))
}

export async function remove (name) {
	return AsyncStorage.removeItem(name)
}


