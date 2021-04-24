class Bond {
	constructor (text) {
		Object.assign(this, { text })
	}
}

Bond.Option = class BondOption {
	constructor (template) {
		Object.assign(this, { template })
	}
}

export default Bond