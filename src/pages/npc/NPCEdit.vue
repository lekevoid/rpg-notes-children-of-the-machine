<template>
	<q-page padding>
		<h1>Edit a NPC</h1>
		<NPCSheet v-if="character" :character="character" />
	</q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import NPCSheet from "components/NPCSheet.vue";

const route = useRoute();
const npcID = parseInt(route.params.id);

const { npcs } = storeToRefs(useNPCsStore());
const character = ref(npcs.value.find((n) => n.id === npcID));

console.log(character);

watch(npcs, (newVal) => {
	character.value = newVal.find((n) => n.id === npcID);
});
</script>
