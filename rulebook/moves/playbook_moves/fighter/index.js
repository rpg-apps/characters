
// race moves imports
import human from './race_moves/human'
import halfling from './race_moves/halfling'
import elf from './race_moves/elf'
import dwarf from './race_moves/dwarf'

// starting moves imports
import signatureWeapon from './starting_moves/signature_weapon'
import armored from './starting_moves/armored'
import bendBarsLiftGates from './starting_moves/bend_bars_lift_gates'

// advanced 2-5 moves imports
import blacksmith from './advanced_moves_2_5/blacksmith'
import ironHide from './advanced_moves_2_5/iron_hide'
import multiclassDabbler from './advanced_moves_2_5/multiclass_dabbler'
import scentOfBlook from './advanced_moves_2_5/scent_of_blook'
import interrogator from './advanced_moves_2_5/interrogator'
import improvedWeapon from './advanced_moves_2_5/improved_weapon'
import armorMastery from './advanced_moves_2_5/armor_mastery'
import heirloon from './advanced_moves_2_5/heirloon'
import merciless from './advanced_moves_2_5/merciless'

// advanced 6-10 moves imports
import superiorWarrior from './advanced_moves_6_10/superior_warrior'
import eyeForWeaponary from './advanced_moves_6_10/eye_for_weaponary'
import throughDeathsEyes from './advanced_moves_6_10/through_deaths_eyes'
import steelHide from './advanced_moves_6_10/steel_hide'
import multiclassInitiate from './advanced_moves_6_10/multiclass_initiate'
import tasteOfBlood from './advanced_moves_6_10/taste_of_blood'
import evilEye from './advanced_moves_6_10/evil_eye'
import armoredPerfection from './advanced_moves_6_10/armored_perfection'
import bloodthirsty from './advanced_moves_6_10/bloodthirsty'

export default {
	raceMoves: {
		human,
		halfling,
		elf,
		dwarf,
	},
	startingMoves: {
		signatureWeapon,
		armored,
		bendBarsLiftGates,
	},
	advancedMoves2_5: {
		blacksmith,
		ironHide,
		multiclassDabbler,
		scentOfBlook,
		interrogator,
		improvedWeapon,
		armorMastery,
		heirloon,
		merciless,
	},
	advancedMoves6_10: {
		superiorWarrior,
		eyeForWeaponary,
		throughDeathsEyes,
		steelHide,
		multiclassInitiate,
		tasteOfBlood,
		evilEye,
		armoredPerfection,
		bloodthirsty,
	}
}