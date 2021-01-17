
// race moves imports
import spellDefence from './race_moves/spell_defence'
import castASpell from './race_moves/cast_a_spell'
import prepareSpells from './race_moves/prepare_spells'
import spellbook from './race_moves/spellbook'
import human from './race_moves/human'
import elf from './race_moves/elf'

// starting moves imports
import ritual from './starting_moves/ritual'
import spellDefence from './starting_moves/spell_defence'
import castASpell from './starting_moves/cast_a_spell'
import prepareSpells from './starting_moves/prepare_spells'
import spellbook from './starting_moves/spellbook'

// advanced 2-5 moves imports
import quickStudy from './advanced_moves_2_5/quick_study'
import counterspell from './advanced_moves_2_5/counterspell'
import arcaneWard from './advanced_moves_2_5/arcane_ward'
import logical from './advanced_moves_2_5/logical'
import enchanter from './advanced_moves_2_5/enchanter'
import expandedSpellbook from './advanced_moves_2_5/expanded_spellbook'
import knowItAll from './advanced_moves_2_5/know_it_all'
import fountOfKnowledge from './advanced_moves_2_5/fount_of_knowledge'
import empoweredMagic from './advanced_moves_2_5/empowered_magic'
import prodigy from './advanced_moves_2_5/prodigy'

// advanced 6-10 moves imports
import selfPowered from './advanced_moves_6_10/self_powered'
import spellAugmentation from './advanced_moves_6_10/spell_augmentation'
import mysticalPuppetStrings from './advanced_moves_6_10/mystical_puppet_strings'
import etherealTether from './advanced_moves_6_10/ethereal_tether'
import protectiveCounter from './advanced_moves_6_10/protective_counter'
import arcaneArmor from './advanced_moves_6_10/arcane_armor'
import highlyLogical from './advanced_moves_6_10/highly_logical'
import enchantersSoul from './advanced_moves_6_10/enchanters_soul'
import greaterEmpoweredMagic from './advanced_moves_6_10/greater_empowered_magic'
import master from './advanced_moves_6_10/master'

export default {
	raceMoves: {
		spellDefence,
		castASpell,
		prepareSpells,
		spellbook,
		human,
		elf,
	},
	startingMoves: {
		ritual,
		spellDefence,
		castASpell,
		prepareSpells,
		spellbook,
	},
	advancedMoves2_5: {
		quickStudy,
		counterspell,
		arcaneWard,
		logical,
		enchanter,
		expandedSpellbook,
		knowItAll,
		fountOfKnowledge,
		empoweredMagic,
		prodigy,
	},
	advancedMoves6_10: {
		selfPowered,
		spellAugmentation,
		mysticalPuppetStrings,
		etherealTether,
		protectiveCounter,
		arcaneArmor,
		highlyLogical,
		enchantersSoul,
		greaterEmpoweredMagic,
		master,
	}
}