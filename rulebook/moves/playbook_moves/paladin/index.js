
// race moves imports
import human from './race_moves/human'

// starting moves imports
import quest from './starting_moves/quest'
import iAmTheLaw from './starting_moves/i_am_the_law'
import armored from './starting_moves/armored'
import layOnHands from './starting_moves/lay_on_hands'

// advanced 2-5 moves imports
import hospitaller from './advanced_moves_2_5/hospitaller'
import voiceOfAuthority from './advanced_moves_2_5/voice_of_authority'
import holyProtection from './advanced_moves_2_5/holy_protection'
import setupStrike from './advanced_moves_2_5/setup_strike'
import staunchDefender from './advanced_moves_2_5/staunch_defender'
import charge from './advanced_moves_2_5/charge'
import exterminatus from './advanced_moves_2_5/exterminatus'
import smite from './advanced_moves_2_5/smite'
import bloodyAegis from './advanced_moves_2_5/bloody_aegis'
import divineFavor from './advanced_moves_2_5/divine_favor'

// advanced 6-10 moves imports
import perfectKnight from './advanced_moves_6_10/perfect_knight'
import indomitable from './advanced_moves_6_10/indomitable'
import perfectHospitaller from './advanced_moves_6_10/perfect_hospitaller'
import divineAuthority from './advanced_moves_6_10/divine_authority'
import divineProtection from './advanced_moves_6_10/divine_protection'
import tandemStrike from './advanced_moves_6_10/tandem_strike'
import imperviousDefender from './advanced_moves_6_10/impervious_defender'
import everOnward from './advanced_moves_6_10/ever_onward'
import holySmite from './advanced_moves_6_10/holy_smite'
import evidenceOfFaith from './advanced_moves_6_10/evidence_of_faith'

export default {
	raceMoves: {
		human,
	},
	startingMoves: {
		quest,
		iAmTheLaw,
		armored,
		layOnHands,
	},
	advancedMoves2_5: {
		hospitaller,
		voiceOfAuthority,
		holyProtection,
		setupStrike,
		staunchDefender,
		charge,
		exterminatus,
		smite,
		bloodyAegis,
		divineFavor,
	},
	advancedMoves6_10: {
		perfectKnight,
		indomitable,
		perfectHospitaller,
		divineAuthority,
		divineProtection,
		tandemStrike,
		imperviousDefender,
		everOnward,
		holySmite,
		evidenceOfFaith,
	}
}