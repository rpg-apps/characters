// BUGS IN PARSER
// 
// - parse inner effects?
// - the parser thinks numbers are addition

import pluralize from 'pluralize'
import { capitalCase } from 'change-case'
import merge from 'deepmerge'

import parseMove from './move'
import parsePlaybook from './playbook'
import parseMechanism from './mechanism'

import Rulebook from '../models/rules'

import Context from './context'

const parsers = { parseMechanism, parseMove, parsePlaybook }

const rulesFields = Object.keys(parsers).map(key => pluralize(key.replace('parse', '').toLowerCase()))

export function parse (yamls, log=console.log) {
  const rawRules = merge.all(yamls)
  const context = new Context(rawRules, { parseMove, parseMechanism })
  const parsedRules = Object.entries(rawRules)
    .filter(([field]) => rulesFields.includes(field))
    .reduce((rules, [field, entries]) => ({ ...rules, [field]: parseEntries(field, entries, context, log) }), { })

  const rulebook = new Rulebook(parsedRules)
  log('Finished parsing')
  log(rulebook)
  return rulebook
}

const parseEntries = (field, entries, context, log) => {
  const parser = parsers[`parse${capitalCase(pluralize.singular(field))}`]
  return Object.entries(entries).map(([entryName, rawEntry]) => parser(entryName, rawEntry, context))
}
