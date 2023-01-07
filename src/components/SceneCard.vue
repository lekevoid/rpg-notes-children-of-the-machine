<template>
	<q-card class="q-mb-lg">
		<q-card-section>
			<h3 class="q-mt-none">{{ scene.name }}</h3>
			<p v-if="scene.link"><a :href="scene.link" target="_blank">Learn more</a></p>
			<p v-for="(description, k) in scene.description" :key="k">{{ description }}</p>
			<p v-if="scene.npcs">
				Who you'll find there :
				<router-link v-for="(npc, j) in scene.npcs" :to="{ name: 'npc_view', params: { id: npc.id } }" :key="j">{{ npc.name }}</router-link>
			</p>
		</q-card-section></q-card
	>
</template>

<script setup>
import { ref, computed, defineProps, watch } from "vue";

const props = defineProps({
	scene: Object,
});

console.log(props.scene);
</script>

<style scoped></style>
