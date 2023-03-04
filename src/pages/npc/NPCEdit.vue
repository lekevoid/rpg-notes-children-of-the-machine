<template>
	<q-page padding>
		<div v-if="character">
			<div class="row">
				<div class="col">
					<h1>Edit : {{ character.name }}</h1>
				</div>
				<div class="col-2 flex items-center justify-end">
					<q-btn round size="md" color="warning" icon="close" :to="{ name: 'npc_view', params: { id: character.id } }" />
				</div>
			</div>
			<NPCSheetEdit :character="character" />
		</div>
	</q-page>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMeta } from "quasar";
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

const metaData = computed(() => ({ title: `Edit ${character?.value?.name}` }));

useMeta(() => {
	return {
		...metaData.value,
	};
});
</script>
