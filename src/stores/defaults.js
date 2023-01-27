import { computed } from "vue";
import { defineStore } from "pinia";

import defaults_human from "data/races_defaults_human.json";
import defaults_changeling from "data/races_defaults_changeling.json";
import defaults_mage from "data/races_defaults_mage.json";
import defaults_vampire from "data/races_defaults_vampire.json";
import defaults_werewolf from "data/races_defaults_werewolf.json";

export const useDefaultsStore = defineStore("defaults", () => {
	const statsListNPC = [
		"Combat",
		"Stealth",
		"Soak",
		"Strength",
		"Charisma",
		"Empathy",
		"Manipulation",
		"Self-Control",
		"Alertness",
		"Culture",
		"Knowledge",
		"Willpower",
	];

	const baseStats = {
		Human: defaults_human,
		Changeling: defaults_changeling,
		Mage: defaults_mage,
		Vampire: defaults_vampire,
		Werewolf: defaults_werewolf,
		NoRace: defaults_human,
	};

	const getHeadStatsForRace = (race = "Human") => {
		return baseStats[race].head;
	};

	const getOptionsListsForRace = (race = "Human") => {
		const out = baseStats[race]?.optionsLists || {};
		for (const toSort in out) {
			out[toSort] = out[toSort].sort();
		}
		return out;
	};

	const statExists = (field) => {
		if (typeof field === "object" && field.length && field.some((f) => typeof f === "undefined")) {
			return false;
		}
		if (field?.value && typeof field.value === "undefined") {
			return false;
		}
		if (typeof field === "undefined") {
			return false;
		}
		return true;
	};

	return {
		statsListNPC,
		baseStats,
		getHeadStatsForRace,
		getOptionsListsForRace,
		statExists,
	};
});
