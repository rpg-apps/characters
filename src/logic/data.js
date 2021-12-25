// TODO add usage of rules here
export default async function getUserCharacters (user) {
  return [
    {
      rulebooks: ['dungeon-world core'],
      playbook: { name: 'thief', fields: {} },
      fields: {
        name: 'Veronica Alamano',
        description: 'Never dependent, stay strong and no nonsense. Ver grew up in a poor part of the city. Her father was a drunk and her mother was a prostitute. When she was fourteen, she came back from school to find out that her father killed her mother in a drunk rage.',
        look: 'Slim body under a hood, dark brown hair',
        race: 'human',
        xp: 5,
        level: 9,
        strength: 12,
        str: 0,
        weak: false,
        dexterity: 18,
        dex: 3,
        shakey: false,
        constitution: 15,
        con: 1,
        sick: false,
        intelligence: 13,
        int: 1,
        stunned: false,
        wisdom: 16,
        wis: 2,
        confused: true,
        charisma: 9,
        cha: 0,
        scarred: false,
        armor: 1,
        damage: 'd8',
        hp: 10,
        'max hp': 21,
        alignment: 'good',
        moves: [{ name: 'hack and Slash' }, { name: 'Volley' }, { name: 'Defy Danger' }, { name: 'Defend' }, { name: 'Spout Lore' }, { name: 'Discern Realities' }, { name: 'Parley' }, { name: 'Aid or Interfere' }],
        equipment: [{ name: 'Ragged Bow' }, { name: 'Bundle of Arrows' }, { name: 'Dagger' }, { name: 'Adventuring Gear' }, { name: 'Dungeon Rations' }],
        bonds: ['I stole something from them.', 'She knows incriminating details about me.']
      },
      notes: '',
      settings: { },
      execute: console.log
    }
  ]
}
