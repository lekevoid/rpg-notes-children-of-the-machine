<template>
	<q-page padding>
		<h1>The Beloved NPCs</h1>
		<div class="row q-pb-md q-col-gutter-lg">
			<div class="col flex flex-center">
				<q-btn
					size="md"
					:color="showChangelingNPCs ? 'green-10' : 'grey-10'"
					icon="img:/img/icon_changeling.png"
					@click="toggleShowChangelingNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col flex flex-center">
				<q-btn
					size="md"
					:color="showHumanNPCs ? 'green-10' : 'grey-10'"
					icon="person_outline"
					@click="toggleShowHumanNPCs()"
					class="full-width glossy"
				/>
			</div>
			<div class="col flex flex-center">
				<q-btn
					size="md"
					:color="showOtherSpernaturalNPCs ? 'green-10' : 'grey-10'"
					icon="img:/img/icon_supernatural.png"
					@click="toggleShowOtherSpernaturalNPCs()"
					class="full-width glossy"
				/>
			</div>
		</div>
		<div v-if="showChangelingNPCs">
			<h2>The Changelings</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in changelingNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<q-separator class="q-my-xl" />
		<div v-if="showHumanNPCs">
			<h2>The Humans</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in humanNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
		<q-separator class="q-my-xl" />
		<div v-if="showOtherSpernaturalNPCs">
			<h2>The Prodigals</h2>
			<div class="row q-col-gutter-lg">
				<div class="col-1" v-for="character in otherSpernaturalNPCs" :key="character.id">
					<NPCThumbnail :character="character" />
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup>
import NPCThumbnail from "components/NPCThumbnail.vue";

import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useNPCsStore } from "stores/npcs";

const showHumanNPCs = ref(true);
const showChangelingNPCs = ref(true);
const showOtherSpernaturalNPCs = ref(true);

const { npcs } = storeToRefs(useNPCsStore());

const humanNPCs = computed(() => {
	return npcs.value
		.map((c) => {
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
			if (c.race && !["Human", "Changeling"].includes(c.race) && showOtherSpernaturalNPCs.value) {
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

function toggleShowOtherSpernaturalNPCs() {
	showOtherSpernaturalNPCs.value = !showOtherSpernaturalNPCs.value;
}
</script>
