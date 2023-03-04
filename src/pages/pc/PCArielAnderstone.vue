<template>
	<q-page padding>
		<PCSheet :character="character">
			<template v-slot:extra-knowledges>
				<PCTraitScore label="Psychology" :score="character.psychology" />
			</template>
		</PCSheet>
	</q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import PCSheet from "components/PCSheet.vue";
import PCTraitScore from "components/PCTraitScore.vue";
import character from "data/pc_ariel.json";

useMeta(() => {
	return {
		title: "Ariel Anderstone",
	};
});
</script>
