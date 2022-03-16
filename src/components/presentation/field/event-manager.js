const THROTTLE_THRESHOLD = 10
const LONG_CLICK_DURATION = 100
const DBL_CLICK_THRESHOLD = 100
const EVENT_THROTTLE = 2*DBL_CLICK_THRESHOLD
const MOVE_LENGTH_UNIT = 10

export default class EventManager {
  constructor (props, handleEvent) {
    this.props = props
    this.touchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
  }

  handle (action, e) {
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.props.handleEvent(this.props, action, e), EVENT_THROTTLE)
  }
  location (e) { return { x: e.pageX || e.touches.[0].pageX, y: e.pageX || e.touches.[0].pageY } }
  vector (start, end) {
    const dx = end.x - start.x, dy = end.y - start.y
    const length = Math.floor((dx**2 + dy**2)**0.5 / MOVE_LENGTH_UNIT)
    const direction = (Math.abs(dx) > Math.abs(dy)) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')
    return { length, direction }
  }

  start (e) {
    if (this.startTime)  return
    this.startTime = Date.now()
    this.startLocation = this.location(e)
  }

  move (e) {
    if (!this.startTime)  return
    const location = this.location(e)
    this.movement = this.vector(this.startLocation, location)
    if (this.movement.length) {
      this.handle('dragging', Object.assign({}, e, { movement: this.movement }))
    }
  }

  end (e) {
    if (!this.startTime)  return
    const timeFromLastClick = this.startTime - this.endTime
    if (timeFromLastClick < THROTTLE_THRESHOLD) return
    this.endTime = Date.now()
    const duration = this.endTime - this.startTime

    if (this.movement)                                this.handle('dragged', Object.assign({}, e, { movement: this.movement }))
    else if (duration > LONG_CLICK_DURATION)          this.handle('long click', e)
    else if (timeFromLastClick < DBL_CLICK_THRESHOLD) this.handle('double click', e)
    else                                              this.handle('click', e)
    this.startTime = null
    this.movement = null
  }

  handlers () {
    if (this.touchDevice) return {
      onTouchStart: e => this.start(e),
      onTouchMove: e => this.move(e),
      onTouchEnd: e => this.end(e),
    }
    else return {
      onMouseDown: e => this.start(e),
      onMouseMove: e => this.move(e),
      onMouseUp: e => this.end(e),
    }
  }
}
