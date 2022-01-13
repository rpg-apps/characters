const settings = {
  stats: {
    rollOnSwipe: { text: 'swipe left on stat to roll it', type: 'boolean', defaultValue: true }
  }
}

const RESOLUTION = 30

const getHandlers = settings => {
  const handlers = {}

  // -------------------- description --------------------
  handlers.description = { click: 'show description' }

  handlers.level = handlers.xp = {
    'swiped right': 'add 1 to xp',
    'swiped left': { 'is xp > 0': { 'yes': 'remove 1 from xp', 'no': 'do nothing' } },
    'swiped up': 'add 1 to level',
    'swiped down': { 'is level > 0': { 'yes': 'remove 1 from level', 'no': 'do nothing' } },
    click: { 'is level up allowed': { 'yes': 'trigger Level Up', 'no': 'do nothing' } }
  }

  // -------------------- main stats --------------------
  handlers['max hp'] = {
   'swiping up': event => {
    const prevent = handlers['max hp'].prevent
    if (prevent && event.deltaY - prevent.deltaY > -RESOLUTION)  return 'do nothing'
    handlers['max hp'].prevent = event
    return { 'is hp < max hp': { 'yes': 'add 1 to hp', 'no': 'do nothing' } }
   },
   'swiping down': event => {
      const prevent = handlers['max hp'].prevent
      if (prevent && event.deltaY - prevent.deltaY < RESOLUTION)  return 'do nothing'
      handlers['max hp'].prevent = event
      return { 'is hp > 0': { 'yes': 'remove 1 from hp', 'no': 'do nothing' } }
    },
   'swiped up': () => { delete handlers['max hp'].prevent },
   'swiped down': () => { delete handlers['max hp'].prevent }
  }
  handlers.damage = { 'swipe up': 'deal damage' }

  handlers.damage = { click: 'deal damage' }

  // -------------------- stats --------------------
  const stats = { strength: 'weak', dexterity: 'shakey', constitution: 'sick', intelligence: 'stunned', wisdom: 'confused', charisma: 'scarred' }
  Object.entries(stats).forEach(([stat, debility]) => {
    const modifier = stat.substring(0, 3)
    handlers[modifier] = {
      'swiped up': `add 1 to ${stat}`,
      'swiped down': `remove 1 from ${stat}`,
      'swiped right': `toggle ${debility}`
    }

    if (settings?.stats?.rollOnSwipe) {
      handlers[modifier]['swiped left'] = `show roll+${modifier}`
    }
  })

  return handlers
}

const all = { settings, getHandlers }

export default all
