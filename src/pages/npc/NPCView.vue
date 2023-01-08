<template>
	<q-page padding>
		<NPCSheetSkeleton v-if="!npc" />
		<q-card class="q-pa-lg" v-else>
			<div class="row">
				<div class="col-10">
					<h1>{{ npc.name }}</h1>
				</div>
				<div class="col-2 flex items-center justify-end">
					<q-btn round size="md" color="primary" icon="edit" :to="{ name: 'npc_edit', params: { id: npc.id } }" />
				</div>
			</div>
			<q-card-section>
				<div class="row q-gutter-lg">
					<div class="col">
						<p v-if="npc.race" class="text-capitalize">Race/Type : {{ npc.race }}</p>
					</div>
					<div class="col">
						<p v-if="npc.head.nature">Nature : {{ npc.head.nature }}</p>
						<p v-if="npc.head.demeanor">Demeanor : {{ npc.head.demeanor }}</p>
						<p v-if="npc.head.court">Court : {{ npc.head.court }}</p>
						<p v-if="npc.head.legacies">
							Legacies :
							{{
								npc.head.legacies.primary === "Seelie"
									? `${npc.head.legacies.seelie}/${npc.head.legacies.unseelie}`
									: `${npc.head.legacies.unseelie}/${npc.head.legacies.seelie}`
							}}
						</p>
						<p v-if="npc.head.house">House : {{ npc.head.house }}</p>
						<p v-if="npc.head.essence">Essence : {{ npc.head.essence }}</p>
					</div>
					<div class="col">
						<p v-if="npc.head.kith">{{ npc.head.kith }}</p>
						<p v-if="npc.head.seeming">{{ npc.head.seeming }}</p>
						<p v-if="npc.head.affiliation">{{ npc.head.affiliation }}</p>
						<p v-if="npc.head.tradition">{{ npc.head.tradition }}</p>
						<p v-if="npc.head.convention">{{ npc.head.convention }}</p>
						<p v-if="npc.head.sect">{{ npc.head.sect }}</p>
						<p v-if="npc.head.generation">{{ npc.head.generation }}</p>
						<p v-if="npc.head.sect">{{ npc.head.sect }}</p>
						<p v-if="npc.head.clan">{{ npc.head.clan }}</p>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Stats</h2>
				<div class="row q-gutter-lg">
					<div class="col">
						<NPCTraitScore label="Combat" :score="npc.stats.combat" />
						<NPCTraitScore label="Stealth" :score="npc.stats.stealth" />
						<NPCTraitScore label="Soak" :score="npc.stats.soak" />
						<NPCTraitScore label="Strength" :score="npc.stats.strength" />
					</div>
					<div class="col">
						<NPCTraitScore label="Charisma" :score="npc.stats.charisma" />
						<NPCTraitScore label="Empathy" :score="npc.stats.empathy" />
						<NPCTraitScore label="Manipulation" :score="npc.stats.manipulation" />
						<NPCTraitScore label="Self-Control" :score="npc.stats.selfControl" />
					</div>
					<div class="col">
						<NPCTraitScore label="Alertness" :score="npc.stats.alertness" />
						<NPCTraitScore label="Culture" :score="npc.stats.culture" />
						<NPCTraitScore label="Knowledge" :score="npc.stats.knowledge" />
						<NPCTraitScore label="Willpower" :score="npc.stats.willpower" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Personality</h2>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">What do they like ?</h3>
								<div>{{ npc.personality.likes }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">What do they dislike ?</h3>
								<div>{{ npc.personality.dislikes }}</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">What do they want, desire, what nudges them ?</h3>
								<div>{{ npc.personality.wants }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">Roleplaying tips</h3>
								<div>{{ npc.personality.rptips }}</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">What are their goals in life ?</h3>
								<div>{{ npc.personality.goals }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card class="bg-grey-10 q-pa-sm">
							<q-card-section>
								<h3 class="q-mt-none q-mb-sm">What are their habits, occupations, hobbies ?</h3>
								<div>{{ npc.personality.habits }}</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup>
import NPCSheetSkeleton from "components/NPCSheetSkeleton.vue";
import NPCTraitScore from "components/NPCTraitScore.vue";

import { ref, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const npcID = ref(parseInt(route.params.id));

const { npcs } = storeToRefs(useNPCsStore());
const npc = ref(npcs.value.find((n) => n.id === npcID.value));

watch([route], () => {
	npcID.value = parseInt(route.params.id);
});

watch([npcs, npcID], (newVal) => {
	npc.value = npcs.value.find((n) => n.id === npcID.value);
});
</script>
