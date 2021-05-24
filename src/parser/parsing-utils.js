import { noCase } from 'change-case'

const SEPERATOR = ' '

export function parseWithKeywords (keywords, expression, params, defaulParser) {
  const keyword = Object.keys(keywords).find(k => expression.startsWith(k + SEPERATOR))
  if (keyword) {
    let restOfExpression = expression.replace(keyword + SEPERATOR, '')
    if (restOfExpression.includes(SEPERATOR)) {
      restOfExpression = restOfExpression.match(/\w+|"[^"]+"/g).map(word => (word.match(/"(.+)"/) || [])[1] || word) 
    }
    if (restOfExpression) {
      return keywords[keyword](restOfExpression, params)
    } else {
      return keywords[keyword](params)
    }
  } else if (defaulParser) {
    return defaulParser(expression, params)
  } else if (params) {
    return { [expression]: params }
  } else {
    return expression
  }
}

export function parseFields (obj, parsers, additionalParams) {
  return Object.entries(parsers).reduce((result, [field, parser]) => {
    const rawField = noCase(field)
    if (obj[rawField]) {
      result[field] = parser(obj[rawField], additionalParams)
    }

    return result
  }, { })
}

export function getFlag (raw, flag, suffix = false) {
  if (raw.constructor !== String) {
    return [false, raw]
  }

  if (suffix) {
    const match = raw.endsWith(` ${flag}`)
    return [match, raw.replace(new RegExp(` ${flag}$`), '')]
  } else {
    const match = raw.startsWith(`${flag} `)
    return [match, raw.replace(new RegExp(`^${flag} `), '')]
  }
}

export class ParsingError extends Error { }

export class PatternParser {
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
        return { ...obj, [name]: parseParam(match[index+1], { type, params }) }
      } else {
        return { ...obj, [name]: parseParam(match[index+1], { params }) }
      }
    }, { ...options })
  }

  paramNames ({ pattern }) {
    return (pattern.match(/<.+?>/g) || [])
      .map(str => str.substring(1, str.length - 1))
  }

  matching ({ pattern }, raw) {
    if (this.hasOptions(raw))   raw = Object.keys(raw)[0]
    return Boolean(raw.match(this.regex({ pattern })))
  }

  regex ({ pattern }) {
    return new RegExp(`^${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/<.+?>/g, '(.+?)')}$`)
  }

  hasOptions (raw) {
    return raw.constructor !== String
  }

  hasOptionsName ({ pattern }) {
    return Boolean(pattern.match(/{.+?}/))
  }

  optionsName ({ pattern }) {
    return pattern.match(/{.+?}/)[0] 
  }

  extractOptions ({ pattern }, raw, parseParam, params) {
    const options = parseParam(Object.values(raw)[0], { type: 'options', params })
    raw = Object.keys(raw)[0]
    return [raw, this.hasOptionsName({ pattern }) ? { [this.optionsName({ pattern })]: options } : options ]
  }
}
