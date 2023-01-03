import { useDefaultsStore } from "stores/defaults";
import { useRacesStore } from "stores/races";

export default async function usePopulateStores() {
	const { fetchDefaults } = useDefaultsStore();
	const { fetchRaces } = useRacesStore();
	await fetchDefaults();
	await fetchRaces();
}
