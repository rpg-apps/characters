export default class Pattern {
  constructor (raw) {
    this.raw = raw
    this.params = (this.raw.match(Pattern.Param.REGEX) || []).map(match => {
      const [type, name] = match.substring(1, match.length - 1).split(Pattern.Param.SEPERATOR)
      return new Pattern.Param(name, type)
    })
  }

  regex () {
    let str = this.raw.replace(/{.+?}/, '').trim()
    this.params.forEach(param => {
      const paramMatch = `(?<${param.name}>${REGEX_WITHOUT_PARENTHASSES})`
      str = str.replace(`<${param.name}>`, paramMatch).replace(`<${param.type}:${param.name}>`, paramMatch)
    })
    return new RegExp(`^${str}$`)
  }

  match (raw) {
    return this._forRawWithOptions(raw, r => this.regex().exec(r))[0]
  }

  extract (raw) {
    const [rawParams, optionsParam] = this._forRawWithOptions(raw, r => (this.regex().exec(r).groups || {}), o => ({ [this._optionsName()]: o }), { })
    Object.keys(rawParams).forEach(key => { rawParams[key] = rawParams[key].match(/^\(.*\)$/) ? rawParams[key].substring(1, rawParams[key].length - 1) : rawParams[key] })
    return { ...rawParams, ...optionsParam }
  }

  getParameterTypes () {
    return this.params.reduce((param, { name, type }) => ({ [name]: type }), { })
  }

  _optionsName () {
    return this.raw.match('{(.+?)}')?.[1]
  }

  _forRawWithOptions (raw, rawCallback = x => x, optionsCallback = x => x, optionsFallback = undefined) {
    if (raw.constructor !== Object) {
      return [rawCallback(String(raw)), optionsFallback]
    } else {
      let options
      [raw, options] = Object.entries(raw)[0]
      return [rawCallback(raw), optionsCallback(options)]
    }
  }
}

Pattern.Param = class PatternParam {
  constructor (name, type) {
    Object.assign(this, { name, type: type || name })
  }
}

const REGEX_WITHOUT_PARENTHASSES = '[^\\)]+?(\\(.+?)?'

Pattern.Param.REGEX = /<(\w+:?\w+?)>/g
Pattern.Param.SEPERATOR = ':'
