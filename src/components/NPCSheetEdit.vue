<template>
	<div class="npc_sheet_edit">
		<NPCSheetSkeleton v-if="!race" />
		<q-card class="q-pa-lg" v-else>
			<q-card-section>
				<h2>Main Information</h2>
				<q-select outlined v-model="race" :options="races" label="Race/Type" class="q-mb-lg" />
				<q-select outlined v-model="head.specialGroup" :options="specialGroups" label="Group" class="q-mb-lg" />
				<div class="row q-gutter-lg">
					<div class="col">
						<q-input outlined v-model="name" label="Name" placeholder="Character Name" class="q-mb-lg" />
					</div>
					<div class="col">
						<q-input outlined v-if="statExists(head.nature)" v-model="head.nature" label="Nature" placeholder="Nature" class="q-mb-lg" />
						<q-select
							outlined
							v-if="statExists([head.court, optionsLists?.courts])"
							v-model="head.court"
							:options="optionsLists.courts"
							label="Court"
							placeholder="Court"
							class="q-mb-lg"
						/>
						<!-- Changeling Legacies -->
						<div v-if="statExists(head.legacies)" :class="['row', 'q-gutter-lg', 'q-mb-lg', { reverse: head.legacies.primary === 'Unseelie' }]">
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
						<!-- Changeling or Demon House -->
						<q-input outlined v-if="statExists(head.house)" v-model="head.house" label="House" placeholder="House" class="q-mb-lg" />
						<!-- Mage Essence -->
						<q-input outlined v-if="statExists(head.essence)" v-model="head.essence" label="Essence" placeholder="Essence" class="q-mb-lg" />
						<!-- Werewolf Breed -->
						<q-select
							outlined
							v-if="statExists([head.breed, optionsLists?.breeds])"
							v-model="head.breed"
							:options="optionsLists.breeds"
							label="Breed"
							placeholder="Breed"
							class="q-mb-lg"
						/>
						<!-- Werewolf Tribe -->
						<q-select
							outlined
							v-if="statExists([head.tribe, optionsLists?.tribes])"
							v-model="head.tribe"
							:options="optionsLists.tribes"
							label="Tribe"
							placeholder="Tribe"
							class="q-mb-lg"
						/>
						<!-- Werewolf Auspice -->
						<q-select
							outlined
							v-if="statExists([head.auspice, optionsLists?.auspices])"
							v-model="head.auspice"
							:options="optionsLists.auspices"
							label="Auspice"
							placeholder="Auspice"
							class="q-mb-lg"
						/>
						<!-- Fera -->
						<q-select
							outlined
							v-if="statExists([head.fera, optionsLists?.fera])"
							v-model="head.fera"
							:options="optionsLists.fera"
							label="Fera"
							placeholder="Fera"
							class="q-mb-lg"
						/>
					</div>
					<div class="col">
						<q-input outlined v-if="statExists(head.demeanor)" v-model="head.demeanor" label="Demeanor" placeholder="Demeanor" class="q-mb-lg" />
						<!-- Fae Kith -->
						<q-input outlined v-if="statExists(head.kith) && race === 'Fae'" v-model="head.kith" label="Kith" placeholder="Kith" class="q-mb-lg" />
						<!-- Changeling Kith -->
						<q-select
							outlined
							v-if="statExists([head.kith, optionsLists?.kiths]) && race === 'Changeling'"
							v-model="head.kith"
							:options="optionsLists.kiths"
							label="Kith"
							placeholder="Kith"
							class="q-mb-lg"
						/>
						<!-- Changeling Seeming -->
						<q-select
							outlined
							v-if="statExists([head.seeming, optionsLists?.seemings])"
							v-model="head.seeming"
							:options="optionsLists.seemings"
							label="Seeming"
							placeholder="Seeming"
							class="q-mb-lg"
						/>
						<!-- Mage Affiliation -->
						<q-select
							outlined
							v-if="statExists([head.affiliation, optionsLists?.affiliations])"
							v-model="head.affiliation"
							:options="optionsLists.affiliations"
							label="Affiliation"
							placeholder="Affiliation"
							class="q-mb-lg"
						/>
						<!-- Tradition -->
						<q-select
							outlined
							v-if="statExists([head.tradition, optionsLists?.traditions, head.affiliation]) && head.affiliation === 'Traditions'"
							v-model="head.tradition"
							:options="optionsLists.traditions"
							label="Tradition"
							placeholder="Tradition"
							class="q-mb-lg"
						/>
						<!-- Technocracy Convention -->
						<q-select
							outlined
							v-if="statExists([head.convention, optionsLists?.conventions, head.affiliation]) && head.affiliation === 'Technocracy'"
							v-model="head.convention"
							:options="optionsLists.conventions"
							label="Convention"
							placeholder="Convention"
							class="q-mb-lg"
						/>
						<!-- Nephandi Sect -->
						<q-input
							outlined
							v-if="statExists([head.sect, head.affiliation]) && head?.affiliation === 'Nephandi'"
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
							v-if="statExists([head.sect, optionsLists?.sects])"
							v-model="head.sect"
							:options="optionsLists.sects"
							label="Sect"
							placeholder="Sect"
							class="q-mb-lg"
						/>
						<!-- Vampire Clan -->
						<q-select
							outlined
							v-if="statExists([head.clan, optionsLists?.clans])"
							v-model="head.clan"
							:options="optionsLists.clans"
							label="Clan"
							placeholder="Clan"
							class="q-mb-lg"
						/>
						<!-- Werewolf Totem -->
						<q-input outlined v-if="statExists(head.totem)" v-model="head.totem" label="Totem" placeholder="Totem" class="q-mb-lg" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2 class="q-mt-none flex justify-between items-center">
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
				</h2>
				<div class="row q-gutter-lg" v-if="Object.values(stats).length">
					<div class="col">
						<TraitScore label="Combat" slug="combat" v-model="stats.Combat" :max-trait="maxTrait" />
						<TraitScore label="Stealth" slug="stealth" v-model="stats.Stealth" :max-trait="maxTrait" />
						<TraitScore label="Soak" slug="soak" v-model="stats.Soak" :max-trait="maxTrait" />
						<TraitScore label="Strength" slug="strength" v-model="stats.Strength" :max-trait="maxTrait" />
					</div>
					<div class="col">
						<TraitScore label="Charisma" slug="charisma" v-model="stats.Charisma" :max-trait="maxTrait" />
						<TraitScore label="Empathy" slug="empathy" v-model="stats.Empathy" :max-trait="maxTrait" />
						<TraitScore label="Manipulation" slug="manipulation" v-model="stats.Manipulation" :max-trait="maxTrait" />
						<TraitScore label="Self-Control" slug="selfControl" v-model="stats['Self-Control']" :max-trait="maxTrait" />
					</div>
					<div class="col">
						<TraitScore label="Alertness" slug="alertness" v-model="stats.Alertness" :max-trait="maxTrait" />
						<TraitScore label="Culture" slug="culture" v-model="stats.Culture" :max-trait="maxTrait" />
						<TraitScore label="Knowledge" slug="knowledge" v-model="stats.Knowledge" :max-trait="maxTrait" />
						<TraitScore label="Willpower" slug="willpower" v-model="stats.Willpower" :max-trait="maxTrait" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Other Notable Traits</h2>
				<div class="row q-col-gutter-lg">
					<div class="col">
						<h3>Powers</h3>
						<div v-for="(power, k) in notableTraits.powers" class="row q-col-gutter-sm q-mb-lg" :key="`power_${k}`">
							<div class="col-4">
								<q-select
									label="Type"
									outlined
									v-model="notableTraits.powers[k].type"
									:options="[...optionsLists.notablePowersTypes, 'Others']"
								/>
							</div>
							<div class="col-4">
								<q-input outlined v-model="notableTraits.powers[k].name" label="Name" placeholder="Name" />
							</div>
							<div class="col-4">
								<q-input outlined v-model.number="notableTraits.powers[k].score" label="Score" placeholder="Score" type="number" />
							</div>
						</div>
						<q-btn round color="primary" icon="add" @click="addNotableTraitPower('powers')" />
					</div>
					<div class="col">
						<h3>Quirks</h3>
						<div v-for="(quirk, k) in notableTraits.quirks" class="row q-col-gutter-sm q-mb-lg" :key="`quirk_${k}`">
							<div class="col-12">
								<q-input outlined v-model="notableTraits.quirks[k]" label="Name" placeholder="Name" />
							</div>
						</div>
						<q-btn round color="primary" icon="add" @click="addNotableTraitPower('quirks')" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>History</h2>
				<q-input v-model="history" outlined type="textarea" placeholder="What's their story so far ?" class="field_history" />
			</q-card-section>
			<q-card-section>
				<h2>Personality</h2>
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
				<q-btn color="secondary" icon="edit" label="Save & Continue" @click="saveAndEdit" class="q-mr-md" v-if="character.id" />
				<q-btn
					color="warning"
					icon="close"
					label="Cancel"
					:to="{ name: 'npc_view', params: { id: character.id } }"
					class="q-mr-md"
					v-if="character.id"
				/>
				<q-btn color="secondary" icon="edit" label="Save & Continue" @click="saveAndEdit" class="q-mr-md" v-if="!character.id" />
				<q-btn color="primary" icon="person_add_alt" label="Save & Create New" @click="saveAndNew" v-if="!character.id" />
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import TraitScore from "components/TraitScore.vue";
import NPCSheetSkeleton from "components/NPCSheetSkeleton.vue";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useDefaultsStore } from "stores/defaults";
import { useRacesStore } from "stores/races";
import { useNPCsStore } from "stores/npcs";
import { useQuasar } from "quasar";
import useSupabase from "boot/supabase";

const $q = useQuasar();
const { supabase } = useSupabase();
const router = useRouter();

const props = defineProps({
	character: Object,
});

const { getHeadStatsForRace, getOptionsListsForRace, statExists } = useDefaultsStore();
const { races } = useRacesStore();
const specialGroups = ["", "Kisosen"];
const { fetchNPC, defaultNPCStats } = useNPCsStore();

const resetStatsScore = ref(4);
const optionsLists = ref(getOptionsListsForRace(props.character.race));
const name = ref(props.character.name);
const race = ref(props.character.race);
const stats = ref(props.character.stats);
const head = ref(props.character.head);
const history = ref(props.character.history);
const personality = ref(props.character.personality);
const notableTraits = ref(props.character.notable_traits || defaultNPCStats.notable_traits);

function resetStats() {
	for (const stat in stats.value) {
		stats.value[stat] = resetStatsScore.value;
	}
}

function toggleLegacies(currentVal) {
	if (!head.value.legacies) {
		return;
	}
	if (currentVal === "Seelie") {
		head.value.legacies.primary = "Unseelie";
	}
	if (currentVal === "Unseelie") {
		head.value.legacies.primary = "Seelie";
	}
}

const maxTrait = computed(() => {
	if (race.value.value === "vampire" && head.value?.generation) {
		return (13 - head.value.generation) * 2;
	}
	return 10;
});

function addNotableTraitPower(which) {
	if (which === "powers") {
		notableTraits.value.powers.push({ type: "", name: "", score: "" });
	}
	if (which === "quirks") {
		notableTraits.value.quirks.push("");
	}
}

function prepareSave() {
	return {
		name: name.value,
		head: head.value,
		race: race.value,
		stats: stats.value,
		history: history.value,
		personality: personality.value,
		notable_traits: notableTraits.value,
	};
}

async function save() {
	const saveData = prepareSave();

	if (props?.character?.id) {
		saveData.id = props.character.id;
	}

	console.log(saveData);

	const { data, error } = await supabase.from("npcs").upsert(saveData).select();

	if (error) {
		throw error;
	}

	$q.notify({ color: "green", message: `<span class='text-p'>${name.value}'s sheet has been saved!</span>`, icon: "thumb_up_alt", html: true });
	return data || true;
}

async function saveAndEdit() {
	const success = await save();
	console.log(success);

	if (success && success[0].id) {
		console.log(success[0].id);
		await fetchNPC(success[0].id);
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

watch(race, (chosenRace) => {
	optionsLists.value = getOptionsListsForRace(chosenRace);
	head.value = getHeadStatsForRace(chosenRace);
});
</script>

<style>
.npc_sheet_edit .field_history {
	overflow: hidden;
}

.npc_sheet_edit .field_history .q-field__native {
	min-height: 300px;
	line-height: 2;
	width: calc(100% + 30px);
	max-width: calc(100% + 30px);
	flex: 0 0 calc(100% + 30px);
	padding-right: 18px;
	padding-bottom: 30px;
}
</style>
