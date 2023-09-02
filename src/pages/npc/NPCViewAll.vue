<template>
	<q-page padding>
		<h1>The Beloved NPCs</h1>
		<div class="row q-pb-md q-col-gutter-lg">
			<div class="col-1 flex flex-center">
				<q-btn
					size="md"
					:color="showChangelingNPCs ? 'green-10' : 'grey-10'"
					icon="img:/img/icon_changeling.png"
					@click="toggleShowChangelingNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col-1 flex flex-center">
				<q-btn
					size="md"
					:color="showHumanNPCs ? 'green-10' : 'grey-10'"
					icon="person_outline"
					@click="toggleShowHumanNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col-1 flex flex-center">
				<q-btn
					size="md"
					:color="showOtherSupernaturalNPCs ? 'green-10' : 'grey-10'"
					icon="img:/img/icon_supernatural.png"
					@click="toggleShowOtherSupernaturalNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col-1 flex flex-center">
				<q-btn
					size="md"
					:color="showKisosenNPCs ? 'green-10' : 'grey-10'"
					icon="img:/img/icon_supernatural.png"
					@click="toggleShowKisosenNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col-12 flex flex-center">
				<q-input outlined dense v-model="nameFilter" label="Search Name" class="full-width" />
			</div>
		</div>
		<div v-if="showChangelingNPCs && changelingNPCs.length > 0">
			<q-separator class="q-my-xl" />
			<h2>The Changelings & Fae</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in changelingNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<div v-if="showHumanNPCs && humanNPCs.length > 0">
			<q-separator class="q-my-xl" />
			<h2>The Humans</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in humanNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<div v-if="showOtherSupernaturalNPCs && otherSpernaturalNPCs.length > 0">
			<q-separator class="q-my-xl" />
			<h2>The Prodigals</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in otherSpernaturalNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<div v-if="showKisosenNPCs && kisosenNPCs.length > 0">
			<q-separator class="q-my-xl" />
			<h2>Denizens of the Suntown of Kisosen</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in kisosenNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<q-separator class="q-my-xl" />
	</q-page>
</template>

<script setup>
import NPCThumbnail from "components/NPCThumbnail.vue";

import { ref, computed, onMounted } from "vue";
import { useMeta } from "quasar";
import { storeToRefs } from "pinia";
import { useNPCsStore } from "stores/npcs";

const nameFilter = ref("");
const showHumanNPCs = ref(true);
const showChangelingNPCs = ref(true);
const showOtherSupernaturalNPCs = ref(true);
const showKisosenNPCs = ref(true);

const { npcs } = storeToRefs(useNPCsStore());

function namesMatch(haystack = "", needle = "") {
	if (haystack === "" || needle === "") {
		return true;
	}

	const h = haystack
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	const n = needle
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

	if (h.includes(n)) {
		return true;
	}
	return false;
}

const humanNPCs = computed(() => {
	return npcs.value
		.map((c) => {
			if (!namesMatch(c.name, nameFilter.value)) {
				return null;
			}
			if (!!c.head.specialGroup) {
				return null;
			}
			if (showHumanNPCs.value && (!c.race || ["Human"].includes(c.race))) {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

const changelingNPCs = computed(() => {
	return npcs.value
		.map((c) => {
			if (!namesMatch(c.name, nameFilter.value)) {
				return null;
			}
			if (!!c.head.specialGroup) {
				return null;
			}
			if (showChangelingNPCs.value && c.race === "Changeling") {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

const otherSpernaturalNPCs = computed(() => {
	return npcs.value
		.map((c) => {
			if (!namesMatch(c.name, nameFilter.value)) {
				return null;
			}
			if (!!c.head.specialGroup) {
				return null;
			}
			if (c.race && !["Human", "Changeling"].includes(c.race) && showOtherSupernaturalNPCs.value) {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

const kisosenNPCs = computed(() => {
	return npcs.value
		.map((c) => {
			if (!namesMatch(c.name, nameFilter.value)) {
				return null;
			}
			if (c.head.specialGroup === "Kisosen") {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

function toggleShowHumanNPCs() {
	showHumanNPCs.value = !showHumanNPCs.value;
}

function toggleShowChangelingNPCs() {
	showChangelingNPCs.value = !showChangelingNPCs.value;
}

function toggleShowOtherSupernaturalNPCs() {
	showOtherSupernaturalNPCs.value = !showOtherSupernaturalNPCs.value;
}

useMeta(() => {
	return {
		title: "NPCs",
	};
});
</script>

<style></style>
