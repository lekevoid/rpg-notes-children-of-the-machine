import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useRacesStore = defineStore("races", () => {
	const fetched = ref(false);
	const fetchedRaces = ref([]);

	const races = computed(() => {
		return fetchedRaces.value;
	});

	function sortRaces(a, b) {
		if (a.value === "human" || a.value < b.value) {
			return -1;
		} else if (a.value > b.value) {
			return 1;
		}
		return 0;
	}

	async function fetchRaces(forceReset = true) {
		if (forceReset || !fetched.value) {
			const { data, error } = await supabase.from("races").select("*");
			if (data) {
				try {
					fetchedRaces.value = data
						.map((r) => ({
							label: r.name,
							value: r.slug,
							isSupernatural: r.is_supernatural,
							npcStartingPoints: r.npc_starting_points,
						}))
						.sort(sortRaces);
					fetched.value = true;
				} catch (e) {
					throw error;
				}
			}
		}
	}

	return { races, fetchRaces };
});
