export default class History {
  constructor () {
    this.events = []
  }

  push (event) {
    this.events.push(event)
  }

  last (filter = () => true) {
    for (let i = this.events.length - 1; i >= 0; i--) {
      let event = this.events[i]
      if (filter(event)) {
        return event
      }
    }
    return undefined
  }
}
