<template>
	<div>
		<q-card>
			<q-card-section>
				<h2>Sheet</h2>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
	character: Object,
});

const name = ref(props.character?.name || "");
const head = ref(props.character?.head || {});
const stats = ref(
	props.character?.stats || {
		combat: 4,
		stealth: 4,
		soak: 4,
		strength: 4,
		charisma: 4,
		empathy: 4,
		manipulation: 4,
		"self-control": 4,
		alertness: 4,
		culture: 4,
		knowledge: 4,
		willpower: 4,
	}
);

const personality = ref(props.character?.personality || { likes: [""], dislikes: [""], wants: [""], rptips: [""], goals: [""], habits: [""] });
</script>
