<template>
	<button class="section_title" @click="unfolded = !unfolded">{{ title }}</button>
	<div v-if="unfolded">
		<div class="block" v-for="link in links" :key="link._path">
			<NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
const unfolded = ref(false);
const props = defineProps(["links", "dir", "title"]);

const { params } = useRoute();
if (props.dir === `/${params.slug[0]}`) {
	unfolded.value = true;
}
</script>
