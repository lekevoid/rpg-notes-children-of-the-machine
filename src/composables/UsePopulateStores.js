import { useNPCsStore } from "stores/npcs";
import { useRacesStore } from "stores/races";

export default async function usePopulateStores() {
	const { fetchNPCs } = useNPCsStore();
	const { fetchRaces } = useRacesStore();
	await fetchNPCs();
	await fetchRaces();
}
