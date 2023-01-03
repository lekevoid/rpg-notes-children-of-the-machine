<template>
	<div>
		<q-card>
			<q-card-section>
				<h2>Sheet</h2>
				<q-select v-model="race" :options="races" label="Race/Type" />
				<q-input v-model="name" label="Name" placeholder="Character Name" />
			</q-card-section>
			<q-card-section>
				<h3>Stats</h3>
				<div class="row" v-if="Object.values(stats).length">
					<div class="col">
						<TraitScore label="Combat" slug="combat" v-model="stats.combat" @change="(e) => markAsModified(e)" />
						<TraitScore label="Stealth" slug="stealth" v-model="stats.stealth" @change="(e) => markAsModified(e)" />
						<TraitScore label="Soak" slug="soak" v-model="stats.soak" @change="(e) => markAsModified(e)" />
						<TraitScore label="Strength" slug="strength" v-model="stats.strength" @change="(e) => markAsModified(e)" />
					</div>
					<div class="col">
						<TraitScore label="Charisma" slug="charisma" v-model="stats.charisma" @change="(e) => markAsModified(e)" />
						<TraitScore label="Empathy" slug="empathy" v-model="stats.empathy" @change="(e) => markAsModified(e)" />
						<TraitScore label="Manipulation" slug="manipulation" v-model="stats.manipulation" @change="(e) => markAsModified(e)" />
						<TraitScore label="Self-Control" slug="selfControl" v-model="stats.selfControl" @change="(e) => markAsModified(e)" />
					</div>
					<div class="col">
						<TraitScore label="Alertness" slug="alertness" v-model="stats.alertness" @change="(e) => markAsModified(e)" />
						<TraitScore label="Culture" slug="culture" v-model="stats.culture" @change="(e) => markAsModified(e)" />
						<TraitScore label="Knowledge" slug="knowledge" v-model="stats.knowledge" @change="(e) => markAsModified(e)" />
						<TraitScore label="Willpower" slug="willpower" v-model="stats.willpower" @change="(e) => markAsModified(e)" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h3>Personality</h3>
				<div class="row q-gutter-xl q-mb-xl">
					<div class="col">
						<q-input v-model="personality.likes" filled type="textarea" placeholder="What do they like ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.dislikes" filled type="textarea" placeholder="What do they dislike ?" />
					</div>
				</div>
				<div class="row q-gutter-xl q-mb-xl">
					<div class="col">
						<q-input v-model="personality.wants" filled type="textarea" placeholder="What do they want, desire, what nudges them ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.rptips" filled type="textarea" placeholder="Roleplaying tips" />
					</div>
				</div>
				<div class="row q-gutter-xl q-mb-xl">
					<div class="col">
						<q-input v-model="personality.goals" filled type="textarea" placeholder="What are their goals in life ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.habits" filled type="textarea" placeholder="What are their habits, occupations, hobbies ?" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<q-btn color="secondary" icon="edit" label="Save & Continue Editing" @click="saveAndEdit" class="q-mr-md" />
				<q-btn color="primary" icon="person_add_alt" label="Save & Create New" @click="saveAndNew" />
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import TraitScore from "components/TraitScore.vue";

import { ref, reactive, computed, defineProps, onMounted, watch, nextTick } from "vue";
import { format } from "quasar";
import { storeToRefs } from "pinia";
import { useDefaultsStore } from "stores/defaults";
import { useRacesStore } from "stores/races";
import { useRouter } from "vue-router";
import useSupabase from "boot/supabase";

const { supabase } = useSupabase();
const router = useRouter();

// Get Quasar Utils
const { capitalize } = format;

const props = defineProps({
	character: Object,
});

const { stats_list_npc } = storeToRefs(useDefaultsStore());
const { races } = storeToRefs(useRacesStore());

const name = ref(props.character?.name || "");

// Dependent Stats
const race = ref(races.value.find((r) => r.value === "human"));
const stats = reactive({});
const modifiedStats = ref([]);
const head = ref(null);

const personality = reactive(props.character?.personality || { likes: "", dislikes: "", wants: "", rptips: "", goals: "", habits: "" });

function populateStartingPoints() {
	const selectedRace = race?.value || "";
	const { npcStartingPoints } = selectedRace;

	for (const stat of stats_list_npc.value) {
		if (!modifiedStats.value.includes(stat)) {
			stats[stat] = npcStartingPoints || 0;
		}
	}
}

function markAsModified(val) {
	modifiedStats.value.push(val);
}

function prepareSave() {
	console.log(name.value);
	console.log(race.value);
	console.log(stats);

	const formattedPersonalities = {};
	for (const dimension in personality) {
		if (personality[dimension] !== "") {
			formattedPersonalities[dimension] = personality[dimension].split("\n");
		}
	}

	return { name: name.value, race: race.value.value, stats: stats, personality: formattedPersonalities };
}

async function saveAndEdit() {
	const saveData = prepareSave();

	const { data, error } = await supabase.from("npcs").insert(saveData).select();

	if (error) {
		throw error;
	}

	if (data && data[0].id) {
		console.log(data[0]);
		router.push({ name: "npc_edit", params: { id: data[0].id } });
	}
}

async function saveAndNew() {
	const saveData = prepareSave();

	const { data, error } = await supabase.from("npcs").insert(saveData);

	if (error) {
		throw error;
	}

	router.go();
}

onMounted(() => {
	populateStartingPoints();
});

watch([race, races, stats_list_npc], () => {
	populateStartingPoints();
});

watch(races, () => {
	if (!race?.value && races?.value.length) {
		race.value = races.value.find((r) => r.value === "human");
	}
});
</script>
