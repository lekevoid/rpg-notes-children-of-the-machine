import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

export const useRacesStore = defineStore("races", () => {
	const races = ["Changeling", "Demon", "Human", "Hunter", "Mage", "Vampire", "Werewolf"];
	return { races };
});
