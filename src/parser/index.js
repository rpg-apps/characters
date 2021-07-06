// TODO what's left:
// formula parsing
// modifier target parsing
// mechanisms menifistation in the playbook view? how to make it extendible? USE CSS

import pluralize from 'pluralize'

import parseMove from './move'
import parsePlaybook from './playbook'
import parseMechanism from './mechanism'

import Rulebook from '../models/rules'

import Context from './context'

const parsers = {
  mechanism: parseMechanism,
  move: parseMove,
  playbook: parsePlaybook
}

export function parse (yamls, log=console.log) {
  log('started parsing')
  log('loading raw rules...')
  const rawRules = mergeRuleBundles(yamls)
  log('raw rules', rawRules)
  const context = new Context(rawRules, { parseMove })
  const parsedRules = Object.entries(rawRules)
    .reduce((rules, [field, entries]) => Object.assign(rules, { [field]: parseEntries(field, entries, context, log) }), { })

  const rulebook = new Rulebook(Object.assign(parsedRules, { context: context.extract() }))
  log('Finished parsing')
  log(rulebook)
  return rulebook
}

// Allow more then one rulebook YAML to reference the same mechanism, move or playbook.
// The Later YAMLs have priority
const  mergeRuleBundles = ruleBundles => {
  return ruleBundles.reduce((allRules, rulesBundle) => {
    Object.entries(rulesBundle).forEach(([field, value]) => {
      allRules[field] ||= {}
      Object.entries(value).forEach(([key, entry]) => {
        allRules[field][key] ||= {}
        Object.assign(allRules[field][key], entry)
      })
    })
    return allRules
  }, { })
}

const parseEntries = (field, entries, context, log) => {
  const parser = parsers[pluralize.singular(field)]
  const parsedEntries = []
  if (parser) {
    Object.entries(entries).forEach(([entryName, rawEntry]) => parsedEntries.push(parser(entryName, rawEntry, context)))
    log(field, parsedEntries)
  }
  return parsedEntries
}
