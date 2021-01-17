
// race moves imports
import calledShot from './race_moves/called_shot'
import huntAndTrack from './race_moves/hunt_and_track'
import human from './race_moves/human'
import elf from './race_moves/elf'

// starting moves imports
import command from './starting_moves/command'
import animalCompoanion from './starting_moves/animal_compoanion'
import calledShot from './starting_moves/called_shot'
import huntAndTrack from './starting_moves/hunt_and_track'

// advanced 2-5 moves imports
import aSafePlace from './advanced_moves_2_5/a_safe_place'
import followMe from './advanced_moves_2_5/follow_me'
import godAmidstTheWastes from './advanced_moves_2_5/god_amidst_the_wastes'
import wellTrained from './advanced_moves_2_5/well_trained'
import blotOutTheSun from './advanced_moves_2_5/blot_out_the_sun'
import mansBestFriend from './advanced_moves_2_5/mans_best_friend'
import camouflage from './advanced_moves_2_5/camouflage'
import vipersStrike from './advanced_moves_2_5/vipers_strike'
import familiarPrey from './advanced_moves_2_5/familiar_prey'
import wildEmpathy from './advanced_moves_2_5/wild_empathy'
import halfElven from './advanced_moves_2_5/half_elven'

// advanced 6-10 moves imports
import unnaturalAlly from './advanced_moves_6_10/unnatural_ally'
import specialTrick from './advanced_moves_6_10/special_trick'
import observant from './advanced_moves_6_10/observant'
import aSaferPlace from './advanced_moves_6_10/a_safer_place'
import strider from './advanced_moves_6_10/strider'
import smaugsBelly from './advanced_moves_6_10/smaugs_belly'
import vipersFangs from './advanced_moves_6_10/vipers_fangs'
import huntersPrey from './advanced_moves_6_10/hunters_prey'
import wildSpeech from './advanced_moves_6_10/wild_speech'

export default {
	raceMoves: {
		calledShot,
		huntAndTrack,
		human,
		elf,
	},
	startingMoves: {
		command,
		animalCompoanion,
		calledShot,
		huntAndTrack,
	},
	advancedMoves2_5: {
		aSafePlace,
		followMe,
		godAmidstTheWastes,
		wellTrained,
		blotOutTheSun,
		mansBestFriend,
		camouflage,
		vipersStrike,
		familiarPrey,
		wildEmpathy,
		halfElven,
	},
	advancedMoves6_10: {
		unnaturalAlly,
		specialTrick,
		observant,
		aSaferPlace,
		strider,
		smaugsBelly,
		vipersFangs,
		huntersPrey,
		wildSpeech,
	}
}