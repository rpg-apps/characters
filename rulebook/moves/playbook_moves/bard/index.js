import elf from './race_moves/elf'
import human from './race_moves/human'

import arcaneArt from './starting_moves/arcane_art'
import charmingAndOpen from './starting_moves/charming_and_open'
import bardicLore from './starting_moves/bardic_lore'
import aPortInTheStorm from './starting_moves/a_port_in_the_storm'

import aLittleHelpFromMyFriends from './advanced_moves_2_5/a_little_help_from_my_friends'
import bamboozle from './advanced_moves_2_5/bamboozle'
import duelistsParry from './advanced_moves_2_5/duelists_parry'
import eldritchTones from './advanced_moves_2_5/eldritch_tones'
import healingSong from './advanced_moves_2_5/healing_song'
import itGoesToEleven from './advanced_moves_2_5/it_goes_to_eleven'
import metalHurlant from './advanced_moves_2_5/metal_hurlant'
import multiclassDabbler from './advanced_moves_2_5/multiclass_dabbler'
import multiclassInitiate from './advanced_moves_2_5/multiclass_initiate'
import viciousCacophony from './advanced_moves_2_5/vicious_cacophony'


import anEarForMagic from './advanced_moves_6_10/an_ear_for_magic'
import con from './advanced_moves_6_10/con_move'
import devious from './advanced_moves_6_10/devious'
import duelistsBlock from './advanced_moves_6_10/duelists_block'
import eldritchChord from './advanced_moves_6_10/eldritch_chord'
import healingChorus from './advanced_moves_6_10/healing_chorus'
import multiclassMaster from './advanced_moves_6_10/multiclass_master'
import reputation from './advanced_moves_6_10/reputation'
import unforgettableFace from './advanced_moves_6_10/unforgettable_face'
import viciousBlast from './advanced_moves_6_10/vicious_blast'

export default {
	raceMOves: {
		elf,
		human
	}
	startingMoves: {
		arcaneArt,
		charmingAndOpen,
		bardicLore,
		aPortInTheStorm
	},
	advancedMoves2_5: {
		aLittleHelpFromMyFriends,
		bamboozle,
		duelistsParry,
		eldritchTones,
		healingSong,
		itGoesToEleven,
		metalHurlant,
		multiclassDabbler,
		multiclassInitiate,
		viciousCacophony
	},

	advancedMoves6_10: {
		anEarForMagic,
		con,
		devious,
		duelistsBlock,
		eldritchChord,
		healingChorus,
		multiclassMaster,
		reputation,
		unforgettableFace,
		viciousBlast
	}
}