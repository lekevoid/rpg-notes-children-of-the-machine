<template>
	<div>
		<NPCSheetSkeleton v-if="!race" />
		<q-card class="q-pa-lg" v-else>
			<q-card-section>
				<h3>Main Information</h3>
				<q-select outlined v-model="race" :options="races" label="Race/Type" class="q-mb-lg" />
				<div class="row q-gutter-lg">
					<div class="col">
						<q-input outlined v-model="name" label="Name" placeholder="Character Name" class="q-mb-lg" />
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
				<h3 class="text-h5 q-mt-none flex justify-between items-center">
					<span>Stats</span>
					<div class="flex items-center">
						<q-select
							style="width: 160px"
							class="q-mr-sm text-sans"
							label="Reset all scores to"
							outlined
							v-model="resetStatsScore"
							:options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
							dense
							options-dense
						/>
						<q-btn color="primary" size="md" label="Go" @click="resetStats" />
					</div>
				</h3>
				<div class="row q-gutter-lg" v-if="Object.values(stats).length">
					<div class="col">
						<TraitScore label="Combat" slug="combat" v-model="stats.combat" :max-trait="maxTrait" />
						<TraitScore label="Stealth" slug="stealth" v-model="stats.stealth" :max-trait="maxTrait" />
						<TraitScore label="Soak" slug="soak" v-model="stats.soak" :max-trait="maxTrait" />
						<TraitScore label="Strength" slug="strength" v-model="stats.strength" :max-trait="maxTrait" />
					</div>
					<div class="col">
						<TraitScore label="Charisma" slug="charisma" v-model="stats.charisma" :max-trait="maxTrait" />
						<TraitScore label="Empathy" slug="empathy" v-model="stats.empathy" :max-trait="maxTrait" />
						<TraitScore label="Manipulation" slug="manipulation" v-model="stats.manipulation" :max-trait="maxTrait" />
						<TraitScore label="Self-Control" slug="selfControl" v-model="stats.selfControl" :max-trait="maxTrait" />
					</div>
					<div class="col">
						<TraitScore label="Alertness" slug="alertness" v-model="stats.alertness" :max-trait="maxTrait" />
						<TraitScore label="Culture" slug="culture" v-model="stats.culture" :max-trait="maxTrait" />
						<TraitScore label="Knowledge" slug="knowledge" v-model="stats.knowledge" :max-trait="maxTrait" />
						<TraitScore label="Willpower" slug="willpower" v-model="stats.willpower" :max-trait="maxTrait" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h3>Personality</h3>
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
				<q-btn color="secondary" icon="edit" label="Save" @click="save" class="q-mr-md" v-if="character.id" />
				<q-btn color="secondary" icon="edit" label="Save & Continue Editing" @click="saveAndEdit" class="q-mr-md" v-if="!character.id" />
				<q-btn color="primary" icon="person_add_alt" label="Save & Create New" @click="saveAndNew" v-if="!character.id" />
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import TraitScore from "components/TraitScore.vue";
import NPCSheetSkeleton from "components/NPCSheetSkeleton.vue";

import { ref, computed, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDefaultsStore } from "stores/defaults";
import { useRacesStore } from "stores/races";
import { useQuasar } from "quasar";
import useSupabase from "boot/supabase";

const $q = useQuasar();
const { supabase } = useSupabase();
const router = useRouter();

const props = defineProps({
	character: Object,
});

const { getHeadStatsForRace, statExists } = useDefaultsStore();
const { races } = storeToRefs(useRacesStore());

const resetStatsScore = ref(4);
const name = ref(props.character.name);
const race = ref(getRaceObject(props.character.race));
const stats = ref(props.character.stats);
const head = ref(props.character.head);
const personality = ref(props.character.personality);

function resetStats() {
	for (const stat in stats.value) {
		console.log(stat);
		stats.value[stat] = resetStatsScore.value;
	}
}

function getRaceObject(str) {
	return races.value.find((r) => r.value === str || r.name === str);
}

function toggleLegacies(currentVal) {
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
	if (race.value.value === "vampire" && head.value?.generation) {
		return (13 - head.value.generation) * 2;
	}
	return 10;
});

function prepareSave() {
	return {
		name: name.value,
		head: head.value,
		race: race.value.value,
		stats: stats.value,
		personality: personality.value,
	};
}

async function save() {
	const saveData = prepareSave();

	if (props?.character?.id) {
		saveData.id = props.character.id;
	}

	const { data, error } = await supabase.from("npcs").upsert(saveData).select();

	if (error) {
		throw error;
	}

	$q.notify({ color: "green", message: `<span class='text-p'>${name.value}'s sheet has been saved!</span>`, icon: "thumb_up_alt", html: true });
	return data || true;
}

async function saveAndEdit() {
	const saveData = prepareSave();
	const success = await save();

	if (success && success[0].id) {
		router.push({ name: "npc_edit", params: { id: success[0].id } });
	}
}

async function saveAndNew() {
	const saveData = prepareSave();
	const success = await save();

	if (success) {
		router.go();
	}
}

watch(races, () => {
	if (!race.value && races.value.length) {
		race.value = getRaceObject(props.character.race);
	}
});

watch(race, (chosenRace) => {
	head.value = getHeadStatsForRace(chosenRace?.value);
});
</script>
