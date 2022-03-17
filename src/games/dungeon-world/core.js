export const settings = {
  advencement: {
    allowXPEditing:           { type: 'boolean', text: 'manually change xp (drag left-right)' },
    allowLevelEditing:        { type: 'boolean', text: 'manually change level (drag up-down)' },
    allowLevelUpExec:         { type: 'boolean', text: 'trigger the level-up move automatically (double click)' }
  },
  stats: {
    allowStatsExec:           { type: 'boolean', text: 'roll stats without a move (double click)' },
    allowStatsEditing:        { type: 'boolean', text: 'manually change stats (drag up-down)' },
    allowDebilitiesToggle:    { type: 'boolean', text: 'manually toggle debilities (long click)' },
  },
  battleStats: {
    allowHpEditing:           { type: 'boolean', text: 'manually change hp (drag up-down)' },
    allowArmorEditing:        { type: 'boolean', text: 'manually change armor (drag up-down)' },
    allowDamageEditing:       { type: 'boolean', text: 'roll change damage (long click)' },
    allowDamageRolls:         { type: 'boolean', text: 'roll damage without a move (double click)' }
  }
}

export const manual = {
  advencement: { allowXPEditing: true, allowLevelEditing: true, allowLevelUpExec: false },
  stats:       { allowStatsExec: false, allowStatsEditing: true, allowDebilitiesToggle: true },
  battleStats: { allowHpEditing: true, allowArmorEditing: true, allowDamageEditing: true, allowDamageRolls: false }
}

export const automatic = {
  advencement: { allowXPEditing: false, allowLevelEditing: false, allowLevelUpExec: true },
  stats:       { allowStatsExec: false, allowStatsEditing: false, allowDebilitiesToggle: true },
  battleStats: { allowHpEditing: false, allowArmorEditing: false, allowDamageEditing: false, allowDamageRolls: false }
}

export function getHandlers (settings) {
  const handlers = { }

  // information
  handlers.name =         { 'long click': 'edit name as text' }
  handlers.description =  { 'click': 'show description', 'long click': 'edit description as long text' }
  handlers.look =         { 'click': 'show description', 'long click': 'edit look as long text' }

  // metadata labels
  handlers.playbook =         { 'click': 'show introduction' }
  handlers.race =             { 'click': 'show race', 'long click': 'execute race move' }
  handlers.alignment =        { 'click': 'show alignment' }
  handlers.bonds =            { 'click': 'edit bonds as bond array' }
  handlers.holds =            { 'click': 'edit holds as hold array' }
  handlers.modifiers =        { 'click': 'edit modifiers as modifier array' }

  // main battle stats
  if (settings.battleStats.allowHpEditing) {
    handlers.hp = handlers['max hp'] = {
     'dragging up': { 'is hp < max hp': { 'yes': 'add 1 to hp', 'no': 'do nothing' } },
     'dragging down': { 'is hp > 0': { 'yes': 'remove 1 from hp', 'no': 'do nothing' } }
    }
  }
  if (settings.battleStats.allowArmorEditing) {
    handlers.armor = {
     'dragging up': 'add 1 to armor',
     'dragging down': { 'is armor > 0': { 'yes': 'remove 1 from armor', 'no': 'do nothing' } }
    }
  }
  handlers['damage-formula'] = { }
  if (settings.battleStats.allowDamageEditing) Object.assign(handlers['damage-formula'], {
    // TODO how do you edit this?!
    'long click': 'edit damage formula as text'
  })
  if (settings.battleStats.allowDamageRolls) Object.assign(handlers['damage-formula'], {
    'double click': 'deal damage'
  })

  // TODO moves

  // TODO gear

  // level and xp
  const xpHandlers = {}
  if (settings.advencement.allowXPEditing) Object.assign(xpHandlers, {
    'dragging right': 'add 1 to xp',
    'dragging left': { 'is xp > 0': { 'yes': 'remove 1 from xp', 'no': 'do nothing' } }
  })
  if (settings.advencement.allowLevelEditing) Object.assign(xpHandlers, {
    'dragging up': 'add 1 to level',
    'dragging down': { 'is level > 1': { 'yes': 'remove 1 from level', 'no': 'do nothing' } }
  })
  if (settings.advencement.allowLevelUpExec) Object.assign(xpHandlers, {
    'double click': { 'is level up allowed': { 'yes': 'trigger Level Up', 'no': 'do nothing' } }
  })
  handlers.level = handlers.xp = xpHandlers

  // stats
  const stats = { strength: 'weak', dexterity: 'shakey', constitution: 'sick', intelligence: 'stunned', wisdom: 'confused', charisma: 'scarred' }
  Object.entries(stats).forEach(([stat, debility]) => {
    const modifier = stat.substring(0, 3)
    handlers[modifier] = { }
    if (settings.stats.allowStatsExec) Object.assign(handlers[modifier], {
      'double click': `show roll+${modifier}`
    })
    if (settings.stats.allowStatsEditing) Object.assign(handlers[modifier], {
      'dragging up': { [`is ${stat} < 18`]: { 'yes': `add 1 to ${stat}`, 'no': 'do nothing' } },
      'dragging down': { [`is ${stat} > 8`]: { 'yes': `remove 1 from ${stat}`, 'no': 'do nothing' } }
    })
    if (settings.stats.allowDebilitiesToggle) Object.assign(handlers[modifier], {
      'long click': `toggle ${debility}`
    })
  })

  return handlers
}
