<template>
	<q-page padding>
		<h1>Add a NPC</h1>
		<NPCSheet :character="defaultNPCStats" />
	</q-page>
</template>

<script setup>
import { useNPCsStore } from "stores/npcs";
const { defaultNPCStats } = useNPCsStore();
import NPCSheet from "components/NPCSheet.vue";
</script>
