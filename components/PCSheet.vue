<template>
	<div class="pc_sheet">
		<h1>{{ data.name }}</h1>
		<pre>{{ data }}</pre>
	</div>
</template>

<script setup lang="ts">
const { path } = useRoute();
const { data } = await useAsyncData("sheet-data", () => queryContent(path).findOne());
</script>
