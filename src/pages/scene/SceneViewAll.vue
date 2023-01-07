<template>
	<q-page padding>
		<h1>Scenes</h1>
		<div class="q-gutter-sm q-mb-xl">
			<q-checkbox v-model="visibleSceneTypes" val="admin" label="Administrative" color="red" />
			<q-checkbox v-model="visibleSceneTypes" val="bar" label="Bars & Clubs" color="red" />
			<q-checkbox v-model="visibleSceneTypes" val="library" label="Libraries" color="teal" />
			<q-checkbox v-model="visibleSceneTypes" val="restaurant" label="Restaurants" color="orange" />
			<q-checkbox v-model="visibleSceneTypes" val="school" label="Schools" color="cyan" />
		</div>
		<SceneCard v-for="scene in filteredScenes" :scene="scene" :key="scene.id" />
	</q-page>
</template>

<script setup>
import SceneCard from "components/SceneCard.vue";

import { ref, computed } from "vue";
import { useScenesStore } from "stores/scenes";
const { scenes } = useScenesStore();

const visibleSceneTypes = ref(["library", "restaurant"]);

const filteredScenes = computed(() => {
	return scenes
		.map((scene) => {
			for (const t of scene.types) {
				if (visibleSceneTypes.value.includes(t)) {
					return scene;
				}
			}
			return null;
		})
		.filter(Boolean);
});
</script>
