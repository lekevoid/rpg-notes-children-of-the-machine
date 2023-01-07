<template>
	<q-item dense tag="a" :to="{ name: 'npc_view', params: { id: character.id } }" class="npc_link q-py-none flex items-center">
		<q-item-section avatar class="flex flex-center">
			<q-icon class="race_icon" :name="raceIcon" />
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ character.name }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
const props = defineProps({ character: Object });

const race = computed(() => {
	if (!props.character.race) {
		return "human";
	}
	return props.character.race;
});

const raceIcon = computed(() => {
	if (race.value === "human") {
		return "person_outline";
	}
	return `img:/img/icon_${race.value}.png`;
});

const itemLink = computed(() => {
	if (typeof props.link === "string") {
		return { name: props.link };
	}
	return props.link;
});
</script>

<style>
.race_icon img {
	object-fit: contain;
}
</style>
