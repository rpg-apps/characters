export default class Alignment {
	constructor (alignment, goal) {
		Object.assign(this, { alignment, goal })
	}
}

Object.assign(Alignment, {
  NATURL: 'natural',

  LAWFUL: 'lawful',
  CHAOTIC: 'chaotic',

  GOOD: 'good',
  EVIL: 'evil'
})