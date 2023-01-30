import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useNPCsStore = defineStore("NPCs", () => {
	const route = useRoute();
	const npcID = ref(parseInt(route.params.id));

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
		notable_traits: {
			powers: [{ type: "", name: "", score: "" }],
			quirks: [""],
		},
	};

	const npcs = computed(() => {
		return fetchedNPCs.value;
	});

	function getNPC(searchID) {
		const out = npcs.value.find((n) => n.id === npcID.value);
		console.log(searchID, out, npcs.value);
		return npcs.value.find((n) => n.id === npcID.value);
	}

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
			if (data) {
				const savedNPC = data[0];
				const indexToReplace = fetchedNPCs.value.findIndex((n) => n.id === savedNPC.id);
				console.log(savedNPC, fetchedNPCs.value);
				console.log("indexToReplace", indexToReplace);
				fetchedNPCs.value.splice(indexToReplace, 1);
				fetchedNPCs.value.push(savedNPC);
				fetchedNPCs.value.sort(sortNPCs);
			}
		} catch (e) {
			throw error;
		}
	}

	return { defaultNPCStats, npcs, getNPC, fetchNPCs, fetchNPC };
});
