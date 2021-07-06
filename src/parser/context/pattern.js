export default class PatternParser {
  getParams ({ pattern }, raw, params, parseParam) {
    let options, type
    if (this.hasOptions(raw)) {
      [raw, options] = this.extractOptions({ pattern }, raw, parseParam, params)
    }

    const paramNames = this.paramNames({ pattern })
    const match = raw.match(this.regex({ pattern }))
    
    if (!paramNames || !match) {
      throw new ParsingError('Text doesnt match { pattern }.')
    }

    return paramNames.reduce((obj, name, index) => {
      if (name.includes(':')) {
        [type, name] = name.split(':')
      } else {
        type = name
      }
      return { ...obj, [name]: parseParam(match[index+1], { type, params }) }
    }, { ...options })
  }

  getNamedParams ({ pattern }, raw, params, parseParam) {
    const paramNames = this.paramNames({ pattern })
    return paramNames.reduce((namedParams, paramName) => {
      return { ...namedParams, [paramName]: params[paramName] }
    }, { })
  }

  paramNames ({ pattern }) {
    return (pattern.match(/<[^<>]+?>/g) || [])
      .map(str => str.substring(1, str.length - 1))
  }

  matching ({ pattern }, raw) {
    if (this.hasOptions(raw))   raw = Object.keys(raw)[0]
    return Boolean(raw.match(this.regex({ pattern })))
  }

  regex ({ pattern }) {
    return new RegExp(`^${pattern.replace(/ {.+?}$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/<[^<>]+?>/g, '(.+?)')}$`)
  }

  hasOptions (raw) {
    return raw.constructor !== String
  }

  hasOptionsName ({ pattern }) {
    return Boolean(pattern.match(/{.+?}/))
  }

  optionsName ({ pattern }) {
    const match = pattern.match(/{.+?}/)[0]
    return match.substring(1, match.length - 1)
  }

  extractOptions ({ pattern }, raw, parseParam, params) {
    const options = parseParam(Object.values(raw)[0], { type: 'options', params })
    raw = Object.keys(raw)[0]
    return [raw, this.hasOptionsName({ pattern }) ? { [this.optionsName({ pattern })]: options } : options ]
  }
}