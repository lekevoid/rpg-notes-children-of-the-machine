import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useNPCsStore = defineStore("NPCs", () => {
	const fetched = ref(false);
	const fetchedNPCs = ref([]);
	const defaultNPCStats = {
		name: "",
		race: "human",
		head: {
			nature: "",
			demeanor: "",
		},
		stats: {
			combat: 4,
			stealth: 4,
			soak: 4,
			strength: 4,
			charisma: 4,
			empathy: 4,
			manipulation: 4,
			selfControl: 4,
			alertness: 4,
			culture: 4,
			knowledge: 4,
			willpower: 4,
		},
		personality: { likes: "", dislikes: "", wants: "", rptips: "", goals: "", habits: "" },
	};

	const npcs = computed(() => {
		return fetchedNPCs.value;
	});

	function sortNPCs(a, b) {
		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		}
		return 0;
	}

	async function fetchNPCs(forceReset = false) {
		if (forceReset || !fetched.value) {
			const { data, error } = await supabase.from("npcs").select().neq("name", "");
			try {
				fetchedNPCs.value = data
					/* .map((character) => {
						if (character.personality) {
							for (const pTrait in character.personality) {
								character.personality[pTrait] = character.personality[pTrait].join("\n");
							}
						}

						return character;
					}) */
					.sort(sortNPCs);
				fetched.value = true;
			} catch (e) {
				throw error;
			}
		}
	}

	return { defaultNPCStats, npcs, fetchNPCs };
});
