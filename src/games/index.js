import * as DWCore from './dungeon-world/core'

export const adapters = {
  'dungeon-world': { core: DWCore }
}

export function adaptersForCharacter (character) {
  return character.rulebooks.map(rulebook => {
    const [game, rules] = rulebook.split(' ')
    return adapters[game][rules]
  })
}

export function plansForCharacter (character) {
  const adapters = adaptersForCharacter(character)

  return PLANS.map(plan => {
    const settings = adapters.reduce((settings, adapter) => ({ ...settings, ...adapter[plan.name] }), { })
    return { ...plan, settings }
  })
}

export const PLANS = [
  { name: 'manual',    description: 'Like a character sheet, only on the computer.' },
  { name: 'automatic', description: 'Let the app do everything for you.' }
]

export const SUPPORTED_RULEBOOKS = ['dungeon-world core']
