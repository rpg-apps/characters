import merge from 'deepmerge'

import MechanismParser from './mechanism'
import parseMove from './move'
import parsePlaybook from './playbook'

import Rulebook from '../models/rules'

export default function parse (yamls, log=console.log) {
  const rawRules = merge.all(yamls)

  const mechanismParser = new MechanismParser(rawRules)
  const mechanisms = Object.entries(rawRules.mechanisms).map(([name, raw]) => mechanismParser.parse(name, raw))

  const moves = Object.entries(rawRules.moves).map(([name, raw]) => parseMove(name, raw))

  const rulebook = new Rulebook(mechanisms, moves)

  Object.entries(rawRules.playbooks).forEach(([name, raw]) => {
    rulebook.playbooks.push(parsePlaybook(name, raw, rulebook, mechanismParser))
  })

  return rulebook
}
