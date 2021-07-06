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

function mapSmolJSON (raw, map) {
  return raw
    .substring(1, raw.length - 1)
    .split(',')
    .reduce((obj, part) => {
      const [key, value] = part.includes(':') ? part.split(':') : [part, part]
      return { ...obj, [key]: map(key, value) }
    }, { })
}
