<template>
	<q-page padding>
		<PCSheet :character="character" />
	</q-page>
</template>

<script setup>
import { useMeta } from "quasar";
import PCSheet from "components/PCSheet.vue";
import character from "data/pc_lucas.json";

useMeta(() => {
	return {
		title: "Lucas Lunde",
	};
});
</script>
