import load from '@rpg-apps/rpg-js'

const cache = {}

export async function getRules (rulebook) {
  if (!cache[rulebook]) {
    cache[rulebook] = await load(rulebook)
  }
  return cache[rulebook]
}

export function supportedRulebooks () {
  return ['dungeon-world core']
}
