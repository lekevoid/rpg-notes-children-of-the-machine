<template>
	<q-page padding>
		<h1>Edit a NPC</h1>
		<p>{{ route.params.id }}</p>
	</q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(route);
</script>
