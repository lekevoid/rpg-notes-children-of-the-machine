<template>
	<div class="row">
		<div class="col-3">{{ label }}</div>
		<div class="col">
			<q-rating v-model="score" max="10" size="2em" color="white" icon="radio_button_unchecked" icon-selected="radio_button_checked">
				<slot v-for="num in 10" :name="`tip-${num}`" :key="num">
					<q-tooltip>{{ num }}</q-tooltip>
				</slot>
			</q-rating>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
const emit = defineEmits(["update:modelValue", "change"]);

const props = defineProps({ label: String, slug: String, modelValue: Number });

const score = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit("update:modelValue", value);
		emit("change", props.slug);
	},
});
</script>
