import STATS from '../../core/stats'

import Playbook from './playbook'

import raceMoves from './race_moves/**'
import startingMoves from './starting_moves/**'
import advancedMoves2_5 from './advanced_moves_2_5/**'
import advancedMoves6_10 from './advanced_moves_6_10/**'

const { BuildingChoice, Stat } = Playbook

const barbarian = new Playbook({
  raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10,

  description: {
    buildingChoices: {
      name: new BuildingChoice('Chose a name', ['Gorm', 'Si-Yi', 'Priscilla', 'Sen', 'Xia', 'Anneira', 'Haepha', 'Lur',
                                                'Shar', 'Korrin', 'Nkosi', 'Fafnir', 'Qua', 'Sacer', 'Vercin’geto', 'Barbozar',
                                                'Clovis', 'Frael', 'Thra raxes', 'Sillius', 'Sha Sheena', 'Khamisi'], { other: true, skippable: true }),
      title: new BuildingChoice('Choose a title', ['the Glorious', 'the Hungry', 'the Irascible', 'the Undefeated', 'the Gluttonous',
                                                   'Foesmasher', 'Bonebreaker', 'the Mirthful', 'the Melancholic', 'All Mighty', 'the Giant',
                                                   'the Triumphant'], { other: true, skippable: true }),
      look: [
        new BuildingChoice('Choose eyes', ['Tormented eyes', 'Haunted eyes', 'Wild eyes', 'Shrouded eyes'], { other: true, skippable: true }),
        new BuildingChoice('Choose build', ['Mighty thews', 'Long shanks', 'Scrawny body', 'Supple body'], { other: true, skippable: true }),
        new BuildingChoice('Choose decoration', ['Strange tattoos', 'Unusual jewelry', 'Unmarred by decoration'], { other: true, skippable: true }),
        new BuildingChoice('Choose clothes', ['Scraps', 'Silks', 'Scavenger’s outfit', 'Weather inappropriate clothes'], { other: true, skippable: true }),
      ]
  }

  damage: { stats: [new Stat(STATS.MAX_HP, 'Constitution+8'), new Stat(STATS.DAMAGE, 'd10')] }

  alignment: {
    buildingChoices: Alignment => ({
      alignment: new BuildingChoice('Choose your alignment:', [
        new Alignment(Alignment.CHAOTIC, 'You eschew a convention of the civilized world.'),
        new Alignment(Alignment.NATURAL, 'Teach someone the ways of your people.')
      ])
    })
  }

  equipment: {
    stats: [new Stat(STATS.LOAD, 'Str+8')],
    buildingChoices: {
      gear: [
        new BuildingChoice('Choose one', [
          new Gear(Gear.Equipment.AXE),
          new Gear(Gear.Equipment.TWO_HANDED_SWORD)
        ]),
        new BuildingChoice('Choose one', [
          [new Gear(Gear.Equipment.ADVENTURING_GEAR), new Gear(Gear.Equipment.DUNGEON_RATIONS)],
          new Gear(Gear.Equipment.CHAINMAIL)
        ])
      ]
    },
    initial: {
      gear: [
        new Gear(Gear.Equipment.DUNGEON_RATIONS),
        new Gear(Gear.Equipment.DAGGER),
        new Gear(new Gear.Equipment('Some token of where you’ve traveled or where you’re from')),
      ]
    }
  }

  bonds: {
    initial: {
      bondOptions: [
        new Bond.Option('<char> is puny and foolish, but amusing to me.'),
        new Bond.Option('<char>’s ways are strange and confusing.'),
        new Bond.Option('<char> is always getting into trouble — I must protect them from themselves.'),
        new Bond.Option('<char> shares my hunger for glory; the earth will tremble at our passing!')
      ]
    }
  }
})

export default barbarian
