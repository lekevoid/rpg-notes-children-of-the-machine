import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useNPCsStore = defineStore("NPCs", () => {
	const fetched = ref(false);
	const fetchedNPCs = ref([]);
	const defaultNPCStats = {
		name: "",
		race: "Human",
		head: {
			nature: "",
			demeanor: "",
		},
		stats: {
			Combat: 4,
			Stealth: 4,
			Soak: 4,
			Strength: 4,
			Charisma: 4,
			Empathy: 4,
			Manipulation: 4,
			"Self-Control": 4,
			Alertness: 4,
			Culture: 4,
			Knowledge: 4,
			Willpower: 4,
		},
		personality: {
			likes: "",
			dislikes: "",
			wants: "",
			rptips: "",
			goals: "",
			habits: "",
		},
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
				fetchedNPCs.value = data.sort(sortNPCs);
				fetched.value = true;
			} catch (e) {
				throw error;
			}
		}
	}

	async function fetchNPC(npcID) {
		const { data, error } = await supabase.from("npcs").select().eq("id", npcID);
		try {
			console.log(data, fetchedNPCs.value);
		} catch (e) {
			throw error;
		}
	}

	return { defaultNPCStats, npcs, fetchNPCs, fetchNPC };
});
