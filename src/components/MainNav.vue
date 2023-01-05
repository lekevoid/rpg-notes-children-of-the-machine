<template>
	<q-list>
		<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('pc')">PCs</q-item-label>
		<div v-if="openSubnavs.includes('pc')">
			<NavLink title="Ahsha Kelek" caption="" icon="face_3" link="pc_ahsha" />
			<NavLink title="Ariel Anderstone" caption="" icon="face_3" link="pc_ariel" />
			<NavLink title="Lucas Lunde" caption="" icon="face_6" link="pc_lucas" />
		</div>
		<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('npc')">NPCs</q-item-label>
		<div v-if="openSubnavs.includes('npc')">
			<div class="row q-px-md">
				<div class="col flex flex-center">
					<q-btn :color="showHumanNPCs ? 'indigo-8' : 'dark'" icon="person_outline" @click="toggleShowHumanNPCs()" class="full-width glossy" />
				</div>
				<div class="col flex flex-center">
					<q-btn
						:color="showChangelingNPCs ? 'indigo-8' : 'dark'"
						icon="img:/src/assets/img/icon_changeling.png"
						@click="toggleShowChangelingNPCs()"
						class="full-width glossy"
					/>
				</div>
				<div class="col flex flex-center">
					<q-btn
						:color="showOtherSpernaturalNPCs ? 'indigo-8' : 'dark'"
						icon="img:/src/assets/img/icon_supernatural.png"
						@click="toggleShowOtherSpernaturalNPCs()"
						class="full-width glossy"
					/>
				</div>
			</div>
			<NavLinkNPC v-for="character in visibleNpcs" :character="character" :key="character.id" />
			<NavLink title="Add a NPC" caption="" icon="add" link="npc_add" />
		</div>
		<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('scene')">Scenes</q-item-label>
		<div v-if="openSubnavs.includes('scene')">
			<NavLink title="Add a Scene" caption="" icon="add" link="scene_add" />
		</div>
	</q-list>
</template>

<script setup>
import NavLink from "components/NavLink.vue";
import NavLinkNPC from "components/NavLinkNPC.vue";

import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import { useNPCsStore } from "stores/npcs";

const route = useRoute();

const openSubnavs = ref(["pc"]);
const showHumanNPCs = ref(true);
const showChangelingNPCs = ref(true);
const showOtherSpernaturalNPCs = ref(true);

const { npcs } = storeToRefs(useNPCsStore());
const visibleNpcs = computed(() => {
	return npcs.value
		.map((c) => {
			if (showHumanNPCs.value && (!c.race || ["human"].includes(c.race))) {
				return c;
			}
			if (showChangelingNPCs.value && c.race === "changeling") {
				return c;
			}
			if (c.race && !["human", "changeling"].includes(c.race) && showOtherSpernaturalNPCs.value) {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

function toggleOpenSubnav(val) {
	if (openSubnavs.value.includes(val)) {
		openSubnavs.value = openSubnavs.value.filter((e) => e !== val);
	} else {
		openSubnavs.value.push(val);
	}
}

function toggleShowHumanNPCs() {
	showHumanNPCs.value = !showHumanNPCs.value;
}
function toggleShowChangelingNPCs() {
	showChangelingNPCs.value = !showChangelingNPCs.value;
}
function toggleShowOtherSpernaturalNPCs() {
	showOtherSpernaturalNPCs.value = !showOtherSpernaturalNPCs.value;
}

onMounted(() => {
	for (const e of ["pc", "npc", "scene"]) {
		const checkRegexp = new RegExp(`^\/${e}`);
		if (route.path.match(checkRegexp)) {
			openSubnavs.value = [e];
		}
	}
});
</script>
