// TODO what's left:
// formula parsing
// modifier target parsing
// mechanisms menifistation in the playbook view? how to make it extendible? USE CSS

import YAML from 'yaml'
import pluralize from 'pluralize'
import { camelCase } from 'change-case'

import parseMove from './move'
import parsePlaybook from './playbook'
import parseMechanism from './mechanism'

import Context from './context'

const parsers = {
  mechanism: parseMechanism,
  move: parseMove,
  playbook: parsePlaybook
}

export function parse (yamls) {
  const rawRules = mergeRuleBundles(yamls.map(yaml => YAML.parse(yaml)))
  const context = new Context(rawRules, { parseMove })
  const parsedRules = Object.entries(rawRules)
    .reduce((rules, [field, entries]) => Object.assign(rules, { [field]: parseEntries(field, entries, context) }), { })

  return parsedRules
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
  Object.entires(entries).forEach((entryName, rawEntry) => parsedEntries.push(parser(entryName, rawEntry, context)))
  return parsedEntries
}
