// TODO what's left:
// Write the rest of the core rules: playbooks and equipment
// formula parsing
// equipment parsing
// modifier target parsing
// mechanics menifistation in the playbook view? how to make it extendible?

import YAML from 'yaml'
import pluralize from 'pluralize'
import { camelCase } from 'change-case'

import parseMove from './move'
import parsePlaybook from './playbook'
import parseEuipment from './equipment'
import parseMechanic from './mechanic'

const parsers = {
  move: parseMove,
  playbook: parsePlaybook,
  equipment: parseEuipment,
  mechanic: parseMechanic
}

export function parse (yamls) {
  const rawRules = mergeRuleBundles(yamls.map(yaml => YAML.parse(yaml)))

  const parsedRules = Object.entries(rawRules)
    .reduce((rules, [field, entries]) => Object.assign(rules, { [field]: parseEntries(field, entries) }), { })

  return parsedRules
}

function mergeRuleBundles (ruleBundles) {
  return ruleBundles.reduce((allRules, rulesBundle) => {
    Object.entries(rulesBundle).forEach(([key, value]) => {
      if (!allRules[key]) {
        allRules[key] = []
      }
      allRules[key] = allRules[key].concat(Array.isArray(value) ? value : Object.entries(value))
    })
    return allRules
  }, { })
}

function parseEntries (field, entries) {
  const parser = parsers[pluralize.singular(field)]
  const parsedEntries = []
  entries.forEach(rawEntry => parseEntries.push(parser(rawEntry, parseEntries)))
  return parsedEntries
}
