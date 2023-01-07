<template>
	<q-page padding>
		<h1>View NPC</h1>
		<q-btn v-if="npc" color="primary" icon="edit" label="Edit" :to="{ name: 'npc_edit', params: { id: npc.id } }" />
		<pre>{{ npc }}</pre>
	</q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const npcID = parseInt(route.params.id);

const { npcs } = storeToRefs(useNPCsStore());
const npc = ref(npcs.value.find((n) => n.id === npcID));

watch(npcs, (newVal) => {
	npc.value = newVal.find((n) => n.id === npcID);
});
</script>
