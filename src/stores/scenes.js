import { computed } from "vue";
import { defineStore } from "pinia";

import fetchScenes from "assets/data/scenes.json";

export const useScenesStore = defineStore("Scenes", () => {
	const scenes = computed(() => {
		return fetchScenes.sort(sortByName);
	});

	function sortByName(a, b) {
		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		}
		return 0;
	}

	return { scenes };
});
