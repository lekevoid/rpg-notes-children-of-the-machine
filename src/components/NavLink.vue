<template>
	<q-item dense :to="itemLink" class="q-py-sm text-h6" style="letter-spacing: 1px">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>
		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
			<q-item-label caption v-if="caption">{{ caption }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
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
