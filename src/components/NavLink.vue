<template>
	<q-item :to="itemLink" class="nav_link">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" :class="[icon.match(/img:/) ? 'round' : '']" />
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
			<q-item-label caption v-if="caption">{{ caption }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({ className: String, title: String, caption: String, link: String, icon: String });

const itemLink = computed(() => {
	if (typeof props.link === "string") {
		return { name: props.link };
	}
	return props.link;
});
</script>
<style scoped>
.q-icon.round {
	border-radius: 1000px;
	overflow: hidden;
	font-size: 32px;
	border: 1px solid rgba(255, 255, 255, 0.6);
}
</style>
