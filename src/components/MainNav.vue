<template>
	<q-list>
		<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('pc')">PCs</q-item-label>
		<div v-if="openSubnavs.includes('pc')">
			<NavLink title="Add a PC" caption="" icon="add" link="pc_add" />
		</div>
		<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('npc')">NPCs</q-item-label>
		<div v-if="openSubnavs.includes('npc')">
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

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const openSubnavs = ref(["pc"]);

function toggleOpenSubnav(val) {
	if (openSubnavs.value.includes(val)) {
		openSubnavs.value = openSubnavs.value.filter((e) => e !== val);
	} else {
		openSubnavs.value.push(val);
	}
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
