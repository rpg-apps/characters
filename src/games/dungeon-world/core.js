const settings = {
  description: {
    editableName:        { type: 'boolean', text: 'click on the name to edit it' },
    editableDescription: { type: 'boolean', text: 'click on the description to edit it' },
    viewableDescription: { type: 'boolean', text: 'click on the description to see it' },
    editableLook:        { type: 'boolean', text: 'click on the look to edit it' },
    viewableLook:        { type: 'boolean', text: 'click on the look to see it' },
    viewableClass:       { type: 'boolean', text: 'click on class to see it' },
    viewableRace:        { type: 'boolean', text: 'click on race to see it' },
    editableRace:        { type: 'boolean', text: 'click on race to edit it' },
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
    rollableDamage: { type: 'boolean', text: 'click on damage to roll it' },
    editableDamage: { type: 'boolean', text: 'swipe up on damage to edit it' },
    editableHP:     { type: 'boolean', text: 'swipe up and down on HP to edit it' },
  },
  collection: {
    executableMoves: { type: 'boolean', text: 'allow ' }
  }
}

const manual = {
  description: { editableName: true,
                 editableDescription: true, viewableDescription: false,
                 editableLook: true, viewableLook: false,
                 viewableClass: false,
                 editableRace: true, viewableRace: false, runnableRace: true,
                 viewableAlignment: true, viewableBonds: true },
  xp: { editableLevel: true, editableXP: true, quickLevelUp: false },
  stats: { rollable: true, editable: true },
  status: { rollableDamage: false, editableDamage: true, editableHP: true },
  collection: { executableMoves: false }
}

const automatic = {
  description: { editableName: true,
                 editableDescription: true, viewableDescription: false,
                 editableLook: true, viewableLook: false,
                 viewableClass: false,
                 editableRace: true, viewableRace: false, runnableRace: true,
                 viewableAlignment: true, viewableBonds: true },
  xp: { editableLevel: true, editableXP: true, quickLevelUp: false },
  stats: { rollable: true, editable: false },
  status: { rollableDamage: false, editableDamage: true, editableHP: true },
  collection: { executableMoves: false }
}

const getHandlers = settings => {
  const handlers = {}

  // -------------------- description --------------------
  if (settings.description?.editableName) {
    handlers.name = { click: 'edit name as text' }
  }

  if (settings.description?.editableDescription) {
    handlers.description = { click: 'edit description as long text' }
  } else if (settings.description?.viewableDescription) {
    handlers.description = { click: 'show description' }
  }

  if (settings.description?.editableLook) {
    handlers.look = { click: 'edit look as long text' }
  } else if (settings.description?.viewableLook) {
    handlers.look = { click: 'show look' }
  }

  if (settings.description?.viewableClass) {
    handlers.playbook = { click: 'show playbook' }
  }

  if (settings.description?.editableRace) {
    handlers.race = { click: 'edit race as race' }
  } else if (settings.description?.viewableRace) {
    handlers.race = { click: 'show race' }
  } else if (settings.description?.runnableRace) {
    handlers.race = { click: 'trigger race.move' }
  }

  if (settings.description?.viewableAlignment) {
    handlers.alignment = { click: 'show alignment' }
  }

  if (settings.description?.viewableBonds) {
    handlers.bonds = { click: 'edit bonds as bond array' }
  }

  handlers.level = handlers.xp = {
    'swiped right': 'add 1 to xp',
    'swiped left': { 'is xp > 0': { 'yes': 'remove 1 from xp', 'no': 'do nothing' } },
    'swiped up': 'add 1 to level',
    'swiped down': { 'is level > 0': { 'yes': 'remove 1 from level', 'no': 'do nothing' } },
    click: { 'is level up allowed': { 'yes': 'trigger Level Up', 'no': 'do nothing' } }
  }

  // -------------------- main stats --------------------
  handlers.hp = handlers['max hp'] = {
   'swiped up': { 'is hp < max hp': { 'yes': 'add 1 to hp', 'no': 'do nothing' } },
   'swiped down': { 'is hp > 0': { 'yes': 'remove 1 from hp', 'no': 'do nothing' } }
  }
  handlers['damage-formula'] = { click: 'deal damage' }

  if (settings.collection.executableMoves) {
    handlers['moves\\.\\d+\\.name'] = { click: (e, moveName) => `trigger ${moveName}` }
  } else {
    handlers['moves\\.\\d+\\.name'] = { click: (e, moveName) => `edit moves as move array` }
  }


  // -------------------- stats --------------------
  const stats = { strength: 'weak', dexterity: 'shakey', constitution: 'sick', intelligence: 'stunned', wisdom: 'confused', charisma: 'scarred' }
  Object.entries(stats).forEach(([stat, debility]) => {
    const modifier = stat.substring(0, 3)
    handlers[modifier] = {
      'swiped up': `add 1 to ${stat}`,
      'swiped down': `remove 1 from ${stat}`,
      'swiped right': `toggle ${debility}`
    }

    if (settings.stats?.rollable) {
      handlers[modifier]['swiped left'] = `show roll+${modifier}`
    }
  })

  return handlers
}

export default { settings, manual, automatic, getHandlers }
