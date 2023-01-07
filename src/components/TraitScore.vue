<template>
	<div class="row items-center">
		<div class="col-1 flex items-center text-weight-bold">
			<div class="bg-dice">
				<span>{{ score }}</span>
			</div>
		</div>
		<div class="trait_name col-4 flex items-center text-weight-bold">
			<span>{{ label }}</span>
			<span v-if="maxTrait < 20"></span>
		</div>
		<div class="col flex items-center">
			<q-rating
				v-model="score"
				:max="maxTrait"
				size="1.2em"
				color="white"
				icon="radio_button_unchecked"
				icon-selected="radio_button_checked"
				v-if="maxTrait < 20"
			>
				<template v-for="num in 18" v-slot:[`tip-${num}`] :key="num">
					<q-tooltip class="bg-black" anchor="top middle" self="bottom middle">{{ num }}</q-tooltip>
				</template>
			</q-rating>
			<div v-else class="text-weight-bold">Plot Device</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";
const emit = defineEmits(["update:modelValue", "change"]);

const props = defineProps({ label: String, slug: String, maxTrait: Number, modelValue: { type: [Number, undefined], default: 4 } });

const score = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit("update:modelValue", value);
		emit("change", props.slug);
	},
});
</script>

<style scoped>
.bg-dice {
	background-image: url("/img/d10_shadow.png");
	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
	position: relative;
	height: 1.6em;
	width: 1.6em;
	margin: 0.2em 0;
	font-family: "Roboto";
}

.bg-dice span {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding-right: 2px;
}
</style>
