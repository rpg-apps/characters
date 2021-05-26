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

export function parse (yamls) {
  console.log('started parsing')
  console.log('loading raw rules...')
  const rawRules = mergeRuleBundles(yamls)
  console.log('raw rules', rawRules)
  const context = new Context(rawRules, { parseMove })
  const parsedRules = Object.entries(rawRules)
    .reduce((rules, [field, entries]) => Object.assign(rules, { [field]: parseEntries(field, entries, context) }), { })

  const rulebook = new Rulebook(Object.assign(parsedRules, { context: context.extract() }))
  console.log('Finished parsing')
  console.log(rulebook)
  return rulebook
}

function mergeRuleBundles (ruleBundles) {
  return ruleBundles.reduce((allRules, rulesBundle) => {
    Object.entries(rulesBundle).forEach(([field, value]) => {
      if (!allRules[field]) {
        allRules[field] = {}
      }

      Object.entries(value).forEach(([key, entry]) => {
        if (allRules[field][key] === undefined) {
          allRules[field][key] = {}
        }
        
        Object.assign(allRules[field][key], entry)
      })
    })
    return allRules
  }, { })
}

function parseEntries (field, entries, context) {
  const parser = parsers[pluralize.singular(field)]
  const parsedEntries = []
  if (parser) {
    Object.entries(entries).forEach(([entryName, rawEntry]) => parsedEntries.push(parser(entryName, rawEntry, context)))
    console.log(field, parsedEntries)
  }
  return parsedEntries
}
