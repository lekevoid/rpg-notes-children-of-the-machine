<template>
	<h1>Edit a NPC</h1>
	<p>{{ route.params.id }}</p>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(route);
</script>
