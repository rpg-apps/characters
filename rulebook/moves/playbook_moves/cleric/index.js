
// race moves imports
import castASpell from './race_moves/cast_a_spell'
import commune from './race_moves/commune'
import turnUndead from './race_moves/turn_undead'
import divineGuidence from './race_moves/divine_guidence'
import deity from './race_moves/deity'
import human from './race_moves/human'
import dwarf from './race_moves/dwarf'

// starting moves imports

// advanced 2-5 moves imports
import devotedHealer from './advanced_moves_2_5/devoted_healer'
import divineProtection from './advanced_moves_2_5/divine_protection'
import orisonForGuidance from './advanced_moves_2_5/orison_for_guidance'
import empower from './advanced_moves_2_5/empower'
import penitent from './advanced_moves_2_5/penitent'
import firstAid from './advanced_moves_2_5/first_aid'
import serenity from './advanced_moves_2_5/serenity'
import theScalesOfLifeAndDeath from './advanced_moves_2_5/the_scales_of_life_and_death'
import invigorate from './advanced_moves_2_5/invigorate'
import chosenOne from './advanced_moves_2_5/chosen_one'

// advanced 6-10 moves imports
import multiclassDabbler from './advanced_moves_6_10/multiclass_dabbler'
import divineArmor from './advanced_moves_6_10/divine_armor'
import greaterEmpower from './advanced_moves_6_10/greater_empower'
import martyr from './advanced_moves_6_10/martyr'
import divineInvincibility from './advanced_moves_6_10/divine_invincibility'
import greaterFirstAid from './advanced_moves_6_10/greater_first_aid'
import providence from './advanced_moves_6_10/providence'
import reaper from './advanced_moves_6_10/reaper'
import apotheosis from './advanced_moves_6_10/apotheosis'
import anointed from './advanced_moves_6_10/anointed'

export default {
	raceMoves: {
		castASpell,
		commune,
		turnUndead,
		divineGuidence,
		deity,
		human,
		dwarf,
	},
	startingMoves: {
	},
	advancedMoves2_5: {
		devotedHealer,
		divineProtection,
		orisonForGuidance,
		empower,
		penitent,
		firstAid,
		serenity,
		theScalesOfLifeAndDeath,
		invigorate,
		chosenOne,
	},
	advancedMoves6_10: {
		multiclassDabbler,
		divineArmor,
		greaterEmpower,
		martyr,
		divineInvincibility,
		greaterFirstAid,
		providence,
		reaper,
		apotheosis,
		anointed,
	}
}