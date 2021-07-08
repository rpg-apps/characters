import { noCase } from 'change-case'

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

export function mapSmolJSON (raw, map) {
  return raw
    .substring(1, raw.length - 1)
    .split(',')
    .reduce((obj, part) => {
      const [key, value] = part.includes(':') ? part.split(':') : [part, part]
      return { ...obj, [key]: map(key, value) }
    }, { })
}
