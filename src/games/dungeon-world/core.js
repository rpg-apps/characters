const settings = {
  stats: {
    rollOnSwipe: { text: 'swipe left on stat to roll it.', type: 'boolean', defaultValue: true }
  }
}

const getHandlers = settings => {
  const handlers = {}

  // -------------------- description --------------------
  handlers.description = { click: 'show description' }


  // -------------------- main stats --------------------
  handlers.['max hp'] = { 'swipe up': 'add 1 to hp' }
  handlers.['max hp'] = { 'swipe up': 'remove 1 from hp' }

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
