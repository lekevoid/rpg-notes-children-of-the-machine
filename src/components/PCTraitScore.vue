<template>
	<div class="row items-center">
		<div class="trait_name col-6 flex items-center">
			<span>{{ label }}</span>
		</div>
		<div class="col flex items-center">
			<q-icon name="radio_button_checked" v-for="num in score" :key="num" />
			<q-icon name="radio_button_unchecked" v-for="num in max - score" :key="num" class="faded" />
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({ label: String, score: Number, max: { type: Number, default: 5 } });
const scoreModel = ref(props.score);
</script>

<style scoped>
.row {
	position: relative;
	font-size: 1.2rem;
}

.row:after {
	z-index: 0;
	position: absolute;
	opacity: 0;
	width: 100%;
	height: 50%;
	content: "";
	transition: opacity 0.2s;
	filter: blur(10px);
	background: linear-gradient(to right, rgba(255, 255, 220, 0) 0%, rgba(255, 255, 220, 0.2) 30%, rgba(255, 255, 220, 0) 100%);
}

.row:hover:after {
	opacity: 1;
}

.trait_name {
	max-width: 140px;
}

.faded {
	opacity: 0.2;
}
</style>
