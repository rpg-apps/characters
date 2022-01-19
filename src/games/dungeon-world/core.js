const settings = {
  description: {
    editableName:        { type: 'boolean', text: 'click on the name to edit it' },
    editableDescription: { type: 'boolean', text: 'click on the description to edit it' },
    viewableDescription: { type: 'boolean', text: 'click on the description to see it' },
    editableLook:        { type: 'boolean', text: 'click on the look to edit it' },
    viewableLook:        { type: 'boolean', text: 'click on the look to see it' },
    viewableClass:       { type: 'boolean', text: 'click on class to see it' },
    viewableRace:        { type: 'boolean', text: 'click on race to see it' },
    editableRace:        { type: 'boolean', text: 'swipe down on race to edit it' },
    runnableRace:        { type: 'boolean', text: 'swipe up on race to run the race move' },
    viewableAlignment:   { type: 'boolean', text: 'click on alignment to see it' },
    viewableBonds:       { type: 'boolean', text: 'click on bonds to edit them' }
  },
  xp: {
    editableLevel: { type: 'boolean', text: 'swipe up or down on XP to change levels' },
    editableXP:    { type: 'boolean', text: 'swipe right or left on XP to add or reduce XP' },
    quickLevelUp:  { type: 'boolean', text: 'click on XP to Level Up when you can' }
  },
  stats: {
    rollable: { type: 'boolean', text: 'swipe left on stat to roll it' },
    editable: { type: 'boolean', text: 'swipe up or down on stat to change it' }
  },
  status: {
    rollable:       { type: 'boolean', text: 'click on damage to roll it' },
    editableDamage: { type: 'boolean', text: 'swipe up on damage to edit it' },
    editableHP:     { type: 'boolean', text: 'swipe up and down on HP to edit it' },
  }
}

const PLANS = [{
  name: 'Manual',
  description: 'Like a character sheet, only on the computer',
  settings: {
    xp: { editableLevel: true, editableXP: true }
  }
}]

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
