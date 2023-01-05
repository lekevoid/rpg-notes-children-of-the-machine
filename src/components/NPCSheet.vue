<template>
	<div>
		<NPCSheetSkeleton v-if="!race" />
		<q-card class="q-pa-lg" v-else>
			<q-card-section>
				<h3 class="text-h5">Main Information</h3>
				<q-select outlined v-model="race" :options="races" label="Race/Type" class="q-mb-lg" />
				<div class="row q-gutter-lg">
					<div class="col">
						<q-input outlined v-if="statExists(head.name)" v-model="name" label="Name" placeholder="Character Name" class="q-mb-lg" />
					</div>
					<div class="col">
						<q-input outlined v-if="statExists(head.nature)" v-model="head.nature" label="Nature" placeholder="Nature" class="q-mb-lg" />
						<q-input outlined v-if="statExists(head.demeanor)" v-model="head.demeanor" label="Demeanor" placeholder="Demeanor" class="q-mb-lg" />
						<q-input outlined v-if="statExists(head.court)" v-model="head.court" label="Court" placeholder="Court" class="q-mb-lg" />
						<div v-if="statExists(head.legacies)" :class="['row', 'q-gutter-lg', 'q-mb-lg', { reverse: head.legacies.primary === 'unseelie' }]">
							<div class="col-5">
								<q-input outlined v-model="head.legacies.seelie" label="Seelie Legacy" placeholder="Seelie Legacy" />
							</div>
							<div class="col flex flex-center">
								<q-btn round color="dark" icon="swap_horiz" @click="toggleLegacies(head.legacies.primary)" />
							</div>
							<div class="col-5">
								<q-input outlined v-model="head.legacies.unseelie" label="Unseelie Legacy" placeholder="Unseelie Legacy" />
							</div>
						</div>
						<q-input outlined v-if="statExists(head.house)" v-model="head.house" label="House" placeholder="House" class="q-mb-lg" />
						<q-input outlined v-if="statExists(head.essence)" v-model="head.essence" label="Essence" placeholder="Essence" class="q-mb-lg" />
					</div>
					<div class="col">
						<!-- Changeling Seeming -->
						<q-input outlined v-if="statExists(head.seeming)" v-model="head.seeming" label="Seeming" placeholder="Seeming" class="q-mb-lg" />
						<!-- Mage Affiliation -->
						<q-select
							outlined
							v-if="statExists([head.affiliation, head.affiliationsList])"
							v-model="head.affiliation"
							:options="head.affiliationsList"
							label="Affiliation"
							placeholder="Affiliation"
							class="q-mb-lg"
						/>
						<!-- Tradition -->
						<q-select
							outlined
							v-if="statExists([head.tradition, head.traditionsList, head.affiliation]) && head.affiliation.value === 'traditions'"
							v-model="head.tradition"
							:options="head.traditionsList"
							label="Tradition"
							placeholder="Tradition"
							class="q-mb-lg"
						/>
						<!-- Technocracy Convention -->
						<q-select
							outlined
							v-if="statExists([head.convention, head.conventionsList, head.affiliation]) && head.affiliation.value === 'technocracy'"
							v-model="head.convention"
							:options="head.conventionsList"
							label="Convention"
							placeholder="Convention"
							class="q-mb-lg"
						/>
						<!-- Nephandi Sect -->
						<q-input
							outlined
							v-if="statExists([head.sect, head.affiliation]) && head.affiliation.value === 'nephandi'"
							v-model="head.sect"
							label="Sect"
							placeholder="Sect"
							class="q-mb-lg"
						/>
						<!-- Vampire Generation -->
						<q-select
							outlined
							v-if="statExists(head.generation)"
							v-model="head.generation"
							:options="[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
							label="Generation"
							placeholder="Generation"
							class="q-mb-lg"
						/>
						<!-- Vampire Sect -->
						<q-select
							outlined
							v-if="statExists([head.sect, head.sectsList])"
							v-model="head.sect"
							:options="head.sectsList"
							label="Sect"
							placeholder="Sect"
							class="q-mb-lg"
						/>
						<!-- Vampire Clan -->
						<q-select
							outlined
							v-if="statExists([head.clan, head.clansList])"
							v-model="head.clan"
							:options="head.clansList"
							label="Clan"
							placeholder="Clan"
							class="q-mb-lg"
						/>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h3 class="text-h5 q-mt-none">Stats</h3>
				<div class="row q-gutter-lg" v-if="Object.values(stats).length">
					<div class="col">
						<TraitScore label="Combat" slug="combat" v-model="stats.combat" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Stealth" slug="stealth" v-model="stats.stealth" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Soak" slug="soak" v-model="stats.soak" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Strength" slug="strength" v-model="stats.strength" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
					</div>
					<div class="col">
						<TraitScore label="Charisma" slug="charisma" v-model="stats.charisma" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Empathy" slug="empathy" v-model="stats.empathy" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore
							label="Manipulation"
							slug="manipulation"
							v-model="stats.manipulation"
							:max-trait="maxTrait"
							@change="(e) => markAsModified(e)"
						/>
						<TraitScore
							label="Self-Control"
							slug="selfControl"
							v-model="stats.selfControl"
							:max-trait="maxTrait"
							@change="(e) => markAsModified(e)"
						/>
					</div>
					<div class="col">
						<TraitScore label="Alertness" slug="alertness" v-model="stats.alertness" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Culture" slug="culture" v-model="stats.culture" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Knowledge" slug="knowledge" v-model="stats.knowledge" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
						<TraitScore label="Willpower" slug="willpower" v-model="stats.willpower" :max-trait="maxTrait" @change="(e) => markAsModified(e)" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h3 class="text-h5">Personality</h3>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-input v-model="personality.likes" outlined type="textarea" placeholder="What do they like ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.dislikes" outlined type="textarea" placeholder="What do they dislike ?" />
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-input v-model="personality.wants" outlined type="textarea" placeholder="What do they want, desire, what nudges them ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.rptips" outlined type="textarea" placeholder="Roleplaying tips" />
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-input v-model="personality.goals" outlined type="textarea" placeholder="What are their goals in life ?" />
					</div>
					<div class="col">
						<q-input v-model="personality.habits" outlined type="textarea" placeholder="What are their habits, occupations, hobbies ?" />
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
import NPCSheetSkeleton from "components/NPCSheetSkeleton.vue";

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

const { statsListNPC, headStats, getHeadStatsForRace, statExists } = useDefaultsStore();
const { races } = storeToRefs(useRacesStore());

const name = ref(props.character?.name || "");

// Dependent Stats
const defaultRace = "human";
const race = ref(races.value.find((r) => r.value === defaultRace));
const stats = reactive({});
const modifiedStats = ref([]);
const head = ref({});

const personality = reactive(props.character?.personality || { likes: "", dislikes: "", wants: "", rptips: "", goals: "", habits: "" });

function populateStartingPoints() {
	const selectedRace = race?.value || "";
	const { npcStartingPoints } = selectedRace;

	for (const stat of statsListNPC) {
		if (!modifiedStats.value.includes(stat)) {
			stats[stat] = npcStartingPoints || 0;
		}
	}

	if (selectedRace) {
		head.value = getHeadStatsForRace(selectedRace.value);
	}
}

function markAsModified(val) {
	modifiedStats.value.push(val);
}

/* const testFilteredHead = computed(() => {
	let out = { ...head.value };
	for (const fieldName in out) {
		if (fieldName.match(/List$/)) {
			delete out[fieldName];
		}
		if (out[fieldName]?.value) {
			out[fieldName] = out[fieldName].value;
		}
	}
	return out;
}); */

function toggleLegacies(currentVal) {
	console.log(currentVal, head.value.legacies);
	if (!head.value.legacies) {
		return;
	}
	if (currentVal === "seelie") {
		head.value.legacies.primary = "unseelie";
	}
	if (currentVal === "unseelie") {
		head.value.legacies.primary = "seelie";
	}
}

const maxTrait = computed(() => {
	console.log(race.value, head.value.generation);
	if (race.value.value === "vampire" && head.value?.generation) {
		console.log("vamp !!!");
		return (13 - head.value.generation) * 2;
	}
	return 10;
});

function prepareSave() {
	console.log(name.value);
	console.log(race.value);
	console.log(stats);

	let filteredHead = {};
	for (const fieldName in out) {
		if (fieldName.match(/List$/)) {
			delete out[fieldName];
		}
		if (out[fieldName]?.value) {
			out[fieldName] = out[fieldName].value;
		}
	}

	const formattedPersonalities = {};
	for (const dimension in personality) {
		if (personality[dimension] !== "") {
			formattedPersonalities[dimension] = personality[dimension].split("\n");
		}
	}

	return { name: name.value, head: filteredHead, race: race.value.value, stats: stats, personality: formattedPersonalities };
}

async function saveAndEdit() {
	const saveData = prepareSave();

	const { data, error } = await supabase.from("npcs").insert(saveData).select();

	if (error) {
		throw error;
	}

	if (data && data[0].id) {
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

watch([race, races, statsListNPC], () => {
	populateStartingPoints();
});

watch(races, () => {
	if (!race?.value && races?.value.length) {
		race.value = races.value.find((r) => r.value === defaultRace);
	}
});
</script>
