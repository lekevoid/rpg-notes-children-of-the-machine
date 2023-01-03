<template>
	<div class="row items-center">
		<div class="col-3 flex items-center">{{ label }}</div>
		<div class="col flex items-center">
			<q-rating v-model="score" max="10" size="1.2em" color="white" icon="radio_button_unchecked" icon-selected="radio_button_checked">
				<template v-slot:tip-1>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">1</q-tooltip>
				</template>
				<template v-slot:tip-2>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">2</q-tooltip>
				</template>
				<template v-slot:tip-3>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">3</q-tooltip>
				</template>
				<template v-slot:tip-4>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">4</q-tooltip>
				</template>
				<template v-slot:tip-5>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">5</q-tooltip>
				</template>
				<template v-slot:tip-6>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">6</q-tooltip>
				</template>
				<template v-slot:tip-7>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">7</q-tooltip>
				</template>
				<template v-slot:tip-8>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">8</q-tooltip>
				</template>
				<template v-slot:tip-9>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">9</q-tooltip>
				</template>
				<template v-slot:tip-10>
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">10</q-tooltip>
				</template>
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
