export default class Gear {
	constructor (equipment, count = 1) {
		Object.assign(this, { equipment, count })
	}
}
