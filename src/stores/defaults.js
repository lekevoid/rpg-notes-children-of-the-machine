import { computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

import defaults_human from "assets/data/races_defaults_human.json";
import defaults_changeling from "assets/data/races_defaults_changeling.json";
import defaults_mage from "assets/data/races_defaults_mage.json";
import defaults_vampire from "assets/data/races_defaults_vampire.json";

export const useDefaultsStore = defineStore("defaults", () => {
	// const fetched = ref(false);
	const statsListNPC = [
		"combat",
		"stealth",
		"soak",
		"strength",
		"charisma",
		"empathy",
		"manipulation",
		"selfControl",
		"alertness",
		"culture",
		"knowledge",
		"willpower",
	];

	const headStats = {
		human: defaults_human,
		changeling: defaults_changeling,
		mage: defaults_mage,
		vampire: defaults_vampire,
		noRace: defaults_human,
	};

	const getHeadStatsForRace = (race = "noRace") => {
		const sortByValue = (a, b) => {
			if (a.value < b.value) {
				return -1;
			}
			if (a.value > b.value) {
				return 1;
			}
			return 0;
		};

		let out = headStats[race] || headStats.noRace;

		for (const fieldName in out) {
			if (fieldName.match(/List$/)) {
				out[fieldName] = out[fieldName].sort(sortByValue);
			}
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
		headStats,
		getHeadStatsForRace,
		statExists,
		// fetchDefaults,
	};
});
