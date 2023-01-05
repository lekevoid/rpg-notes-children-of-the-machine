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
import PCSheet from "components/PCSheet.vue";
import PCTraitScore from "components/PCTraitScore.vue";
import character from "assets/data/pc_ariel.json";
</script>
