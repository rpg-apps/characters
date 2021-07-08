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
    this.params.forEach(param => { str = str.replace(`<${param.name}>`, `(?<${param.name}>.*)`).replace(`<${param.type}:${param.name}>`, `(?<${param.name}>.*)`) })
    return new RegExp(str)
  }

  match (raw) {
    return this._forRawWithOptions(raw, r => this.regex().exec(r))[0]
  }

  extract (raw) {
    const [rawParams, optionsParam] = this._forRawWithOptions(raw, r => this.regex().exec(r).groups, o => ({ [this._optionsName()]: o }), { })
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

Pattern.Param.REGEX = /<(.+?)>/g
Pattern.Param.SEPERATOR = ':'
