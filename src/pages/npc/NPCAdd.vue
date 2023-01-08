<template>
	<q-page padding>
		<h1>Add a NPC</h1>
		<NPCSheetEdit :character="defaultNPCStats" />
	</q-page>
</template>

<script setup>
import { useNPCsStore } from "stores/npcs";
const { defaultNPCStats } = useNPCsStore();
import NPCSheetEdit from "components/NPCSheetEdit.vue";
</script>
