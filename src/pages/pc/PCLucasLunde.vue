<template>
	<q-page padding>
		<PCSheet :character="character" />
	</q-page>
</template>

<script setup>
import PCSheet from "components/PCSheet.vue";
import character from "assets/data/pc_lucas.json";
</script>
