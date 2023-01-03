import { ref } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useDefaultsStore = defineStore("defaults", () => {
	const fetched = ref(false);
	const stats_list_npc = ref([]);

	async function fetchDefaults(forceReset = true) {
		if (forceReset || !fetched.value) {
			const { data, error } = await supabase.from("defaults").select("*");
			try {
				stats_list_npc.value = data.find((e) => e.name === "stats_list_npc")?.value || null;
				fetched.value = true;
			} catch (e) {
				throw error;
			}
		}
	}

	return {
		stats_list_npc,
		fetchDefaults,
	};
});
