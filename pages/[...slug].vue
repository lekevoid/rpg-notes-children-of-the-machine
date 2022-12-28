<template>
	<div id="global" class="flex">
		<Nav />
		<main class="w-11/12">
			<NuxtLayout :name="layout" />
		</main>
	</div>
</template>

<script setup>
const { params } = useRoute();
let layout = params?.slug[0];

console.log(layout);
</script>
