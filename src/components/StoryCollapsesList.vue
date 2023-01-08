<template>
	<q-list bordered class="story_collapse rounded-borders">
		<q-expansion-item
			v-for="(entry, k) in entries"
			expand-separator
			:icon="icon(entry)"
			:label="entry.title"
			:header-class="['text-h6', entry.initiated ? 'text-white' : 'text-light-blue']"
			:key="`story_entry_${k}`"
		>
			<q-card :class="['q-pl-xl', entry.initiated ? 'text-white' : 'text-light-blue']">
				<q-card-section class="q-pl-lg q-py-sm">
					<p v-for="(par, j) in entry.text" :key="`story_entry_${k}_${j}`">{{ par }}</p>
				</q-card-section>
			</q-card>
		</q-expansion-item>
	</q-list>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
const props = defineProps({ entries: Object, icon: String });

function icon(entry = false) {
	console.log(entry);
	if (entry.supernatural_type) {
		return entry.initiated ? `img:/img/icon_${entry.supernatural_type}.png` : `img:/img/icon_${entry.supernatural_type}_light_blue.png`;
	}

	return props.icon;
}
</script>

<style>
.story_collapse .q-icon img {
	object-fit: contain;
}
</style>
