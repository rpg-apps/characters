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
      result[field] = parser(object[rawField], additionalParams)
    }

    return result
  })
}

export function getFlag (text, flag, suffix = false) {
  if (suffix) {
    const match = text.endsWith(` ${flag}`)
    return [match, text.replace(new RegExp(` ${flag}$`), '')]
  } else {
    const match = text.startsWith(`${flag} `)
    return [match, text.replace(new RegExp(`^${flag} `), '')]
  }
}

export class ParsingError extends Error {
  constructor (message) {
    super(message)
  }
}
