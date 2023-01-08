<template>
	<q-card class="q-mb-lg">
		<q-card-section>
			<div class="row">
				<div class="col-8">
					<h2 class="q-mt-none">{{ scene.name }}</h2>
					<p v-if="scene.link"><a :href="scene.link" target="_blank">Learn more</a></p>
					<p v-for="(description, k) in scene.description" :key="k">{{ description }}</p>
					<p v-if="scene.npcs">
						Who you'll find there :
						<router-link v-for="(npc, j) in scene.npcs" :to="{ name: 'npc_view', params: { id: npc.id } }" :key="j">{{ npc.name }}</router-link>
					</p>
				</div>
				<div class="col-4">
					<q-img class="full-width rounded-borders" :src="`/img/scenes/scene_${scene.id}.jpg`" />
				</div>
			</div> </q-card-section
	></q-card>
</template>

<script setup>
import { ref, computed, defineProps, watch } from "vue";

const props = defineProps({
	scene: Object,
});

console.log(props.scene);
</script>

<style scoped></style>
