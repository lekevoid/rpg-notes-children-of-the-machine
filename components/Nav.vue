<template>
	<div class="flex flex-col w-1/12">
		<NavLinksList v-for="section in navigation" :links="section.children" :dir="section._path" :title="section.title" />
	</div>
</template>

<script setup>
const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation());
</script>
