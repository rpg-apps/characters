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
        level: 9
      }
    }
  ]
}
