<template>
	<router-link class="npc_thumb full-width" :to="{ name: 'npc_view', params: { id: character.id } }">
		<q-img
			v-if="portraitExists"
			:src="`/img/npcs/${slugify(character.name)}_tb.jpg`"
			class="rounded-borders"
			@error.prevent="portraitExists = false"
			:ratio="3 / 4"
		>
			<div class="absolute-bottom text-subtitle2 text-center">{{ character.name }}</div>
		</q-img>
		<q-img
			v-if="!portraitExists"
			loading="lazy"
			:src="`/img/npcs/unknown_${character.race}.jpg`"
			class="rounded-borders"
			@error="portraitExists = false"
			:ratio="3 / 4"
		>
			<div class="absolute-bottom text-subtitle2 text-center">{{ character.name }}</div>
		</q-img>
	</router-link>
</template>

<script setup>
import { ref, computed, onUpdated, watch } from "vue";

const props = defineProps({
	character: Object,
});

function slugify(str) {
	const out = str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w]+/g, "_")
		.replace(/^_|_$/g, "")
		.toLowerCase();
	return out;
}

const portraitExists = ref(true);

onUpdated(() => {
	portraitExists.value = true;
});
</script>

<style scoped>
.npc_thumb {
	height: 200px;
}
</style>

<style>
.npc_thumb .q-img__content > div {
	padding: 6px 8px;
	line-height: 100%;
}
.npc_thumb .absolute-bottom {
	background: transparent linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
