<template>
	<q-page padding class="page_notes">
		<h1>Notes</h1>
		<q-card>
			<q-tabs v-model="tab" align="left" class="bg-dark text-white">
				<q-tab class="text-purple" name="powers" icon="offline_bolt" label="Powers" />
				<q-tab class="text-yellow" name="epiphanies" icon="emoji_objects" label="Epiphanies" />
			</q-tabs>
			<q-separator />
			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="powers">
					<NotesPowers />
				</q-tab-panel>
				<q-tab-panel name="epiphanies">
					<NotesEpiphanies />
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</q-page>
</template>

<script setup>
import { ref, computed } from "vue";

const tab = ref("powers");

import NotesPowers from "components/NotesPowers.vue";
import NotesEpiphanies from "components/NotesEpiphanies.vue";
</script>

<style></style>
