// TODO what's left:
// formula parsing
// modifier target parsing
// mechanisms menifistation in the playbook view? how to make it extendible? USE CSS

import pluralize from 'pluralize'
import { capitalCase } from 'change-case'
import merge from 'deepmerge'

import parseMove from './move'
import parsePlaybook from './playbook'
import parseMechanism from './mechanism'

import Rulebook from '../models/rules'

import Context from './context'

const parsers = { parseMechanism, parseMove, parsePlaybook }

export function parse (yamls, log=console.log) {
  log('started parsing')
  log('loading raw rules...')
  const rawRules = merge.all(yamls)
  log('raw rules', rawRules)
  const context = new Context(rawRules, { parseMove, parseMechanism })
  const parsedRules = Object.entries(rawRules)
    .reduce((rules, [field, entries]) => ({ ...rules, [field]: parseEntries(field, entries, context, log) }), { })

  const rulebook = new Rulebook(parsedRules)
  log('Finished parsing')
  log(rulebook)
  return rulebook
}

const parseEntries = (field, entries, context, log) => {
  const parser = parsers[`parse${capitalCase(pluralize.singular(field))}`]
  if (!parser)   return Array.isArray(entries) ? entries : Object.entries(entries).map(([name, value]) => ({ ...value, name }))
  
  const parsedEntries = Object.entries(entries).map(([entryName, rawEntry]) => parser(entryName, rawEntry, context))
  log(field, parsedEntries)
  return parsedEntries
}
