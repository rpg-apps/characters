
// race moves imports
import salamander from './race_moves/salamander'
import human from './race_moves/human'

// starting moves imports
import handCrafted from './starting_moves/hand_crafted'
import giveMeFuelGiveMeFire from './starting_moves/give_me_fuel_give_me_fire'
import zukoStyle from './starting_moves/zuko_style'
import fightingFireWithFire from './starting_moves/fighting_fire_with_fire'
import burningBrand from './starting_moves/burning_brand'

// advanced 2-5 moves imports
import sickBurn from './advanced_moves_2_5/sick_burn'
import theEnkindler from './advanced_moves_2_5/the_enkindler'
import burningBridges from './advanced_moves_2_5/burning_bridges'
import mothToTheFlame from './advanced_moves_2_5/moth_to_the_flame'
import ogdruJahad from './advanced_moves_2_5/ogdru_jahad'
import firebrand from './advanced_moves_2_5/firebrand'
import thisKillingFire from './advanced_moves_2_5/this_killing_fire'
import burnsHalfAsLong from './advanced_moves_2_5/burns_half_as_long'
import burnsTwiceAsBright from './advanced_moves_2_5/burns_twice_as_bright'
import loreOfFlame from './advanced_moves_2_5/lore_of_flame'

// advanced 6-10 moves imports
import watchTheWorldBurn from './advanced_moves_6_10/watch_the_world_burn'
import fanningTheFlames from './advanced_moves_6_10/fanning_the_flames'
import burningRingOfFire from './advanced_moves_6_10/burning_ring_of_fire'
import fromHellsHeart from './advanced_moves_6_10/from_hells_heart'

export default {
	raceMoves: {
		salamander,
		human,
	},
	startingMoves: {
		handCrafted,
		giveMeFuelGiveMeFire,
		zukoStyle,
		fightingFireWithFire,
		burningBrand,
	},
	advancedMoves2_5: {
		sickBurn,
		theEnkindler,
		burningBridges,
		mothToTheFlame,
		ogdruJahad,
		firebrand,
		thisKillingFire,
		burnsHalfAsLong,
		burnsTwiceAsBright,
		loreOfFlame,
	},
	advancedMoves6_10: {
		watchTheWorldBurn,
		fanningTheFlames,
		burningRingOfFire,
		fromHellsHeart,
	}
}