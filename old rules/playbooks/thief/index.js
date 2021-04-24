
// race moves imports
import human from './race_moves/human'
import halfling from './race_moves/halfling'

// starting moves imports
import poisoner from './starting_moves/poisoner'
import flexibleMorals from './starting_moves/flexible_morals'
import backstab from './starting_moves/backstab'
import tricksOfTheTrade from './starting_moves/tricks_of_the_trade'
import trapExpert from './starting_moves/trap_expert'

// advanced 2-5 moves imports
import connections from './advanced_moves_2_5/connections'
import underdog from './advanced_moves_2_5/underdog'
import brewer from './advanced_moves_2_5/brewer'
import envenom from './advanced_moves_2_5/envenom'
import poisonMaster from './advanced_moves_2_5/poison_master'
import shootFirst from './advanced_moves_2_5/shoot_first'
import qealthAndTaste from './advanced_moves_2_5/qealth_and_taste'
import caution from './advanced_moves_2_5/caution'
import cheapShot from './advanced_moves_2_5/cheap_shot'

// advanced 6-10 moves imports
import heist from './advanced_moves_6_10/heist'
import disguise from './advanced_moves_6_10/disguise'
import escapeRoute from './advanced_moves_6_10/escape_route'
import storngArmTrueAim from './advanced_moves_6_10/storng_arm_true_aim'
import evasion from './advanced_moves_6_10/evasion'
import seriousUnderdog from './advanced_moves_6_10/serious_underdog'
import alchemist from './advanced_moves_6_10/alchemist'
import extermelyCaution from './advanced_moves_6_10/extermely_caution'
import dirtyFighter from './advanced_moves_6_10/dirty_fighter'

export default {
	raceMoves: {
		human,
		halfling,
	},
	startingMoves: {
		poisoner,
		flexibleMorals,
		backstab,
		tricksOfTheTrade,
		trapExpert,
	},
	advancedMoves2_5: {
		connections,
		underdog,
		brewer,
		envenom,
		poisonMaster,
		shootFirst,
		qealthAndTaste,
		caution,
		cheapShot,
	},
	advancedMoves6_10: {
		heist,
		disguise,
		escapeRoute,
		storngArmTrueAim,
		evasion,
		seriousUnderdog,
		alchemist,
		extermelyCaution,
		dirtyFighter,
	}
}