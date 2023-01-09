<template>
	<q-page padding>
		<div v-if="character">
			<h1>Edit : {{ character.name }}</h1>
			<NPCSheetEdit :character="character" />
		</div>
	</q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import NPCSheetEdit from "components/NPCSheetEdit.vue";

const route = useRoute();
const npcID = parseInt(route.params.id);

const { npcs } = storeToRefs(useNPCsStore());
const character = ref(npcs.value.find((n) => n.id === npcID));

watch(npcs, (newVal) => {
	character.value = newVal.find((n) => n.id === npcID);
});
</script>
