// TODO add usage of rules here
export default async function getUserCharacters (user) {
  return [
    {
      rulebooks: ['dungeon-world core'],
      playbook: { name: 'thief', fields: {} },
      fields: {
        name: 'Veronica Alamano',
        race: { name: 'human' },
        xp: 5,
        level: 9,
        strength: 12,
        str: 0,
        dexterity: 18,
        dex: 3,
        constitution: 15,
        con: 1,
        intelligence: 13,
        int: 1,
        wisdom: 16,
        wis: 2,
        charisma: 9,
        cha: 0
      }
    }
  ]
}
