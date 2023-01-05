import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useNPCsStore = defineStore("NPCs", () => {
	const fetched = ref(false);
	const fetchedNPCs = ref([]);

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
				console.log(data, data.sort(sortNPCs));
				fetchedNPCs.value = data.sort(sortNPCs);
				fetched.value = true;
			} catch (e) {
				throw error;
			}
		}
	}

	return { npcs, fetchNPCs };
});
