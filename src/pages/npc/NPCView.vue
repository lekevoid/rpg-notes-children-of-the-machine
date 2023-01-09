<template>
	<q-page padding>
		<NPCSheetSkeleton v-if="!npc" />
		<q-card class="q-pa-lg" v-else>
			<q-card-section>
				<div class="row">
					<div class="col-10">
						<h1>{{ npc.name }}</h1>
					</div>
					<div class="col-2 flex items-center justify-end">
						<q-btn round size="md" color="primary" icon="edit" :to="{ name: 'npc_edit', params: { id: npc.id } }" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<div class="row q-col-gutter-xl">
					<div class="col-8">
						<div class="row q-col-gutter-xl">
							<div class="col">
								<p v-if="npc.race" class="text-capitalize">Race/Type : {{ npc.race }}</p>
							</div>
							<div class="col">
								<p v-if="npc.head.nature">Nature : {{ npc.head.nature }}</p>
								<p v-if="npc.head.demeanor">Demeanor : {{ npc.head.demeanor }}</p>
								<p v-if="npc.head.court">Court : {{ npc.head.court }}</p>
								<p v-if="npc.head.legacies?.seelie">
									Legacies :
									{{
										npc.head.legacies.primary === "Seelie"
											? `${npc.head.legacies.seelie}/${npc.head.legacies.unseelie}`
											: `${npc.head.legacies.unseelie}/${npc.head.legacies.seelie}`
									}}
								</p>
								<p v-if="npc.head.house">House : {{ npc.head.house }}</p>
								<p v-if="npc.head.essence">Essence : {{ npc.head.essence.value }}</p>
								<p v-if="npc.head.breed">Breed : {{ npc.head.breed }}</p>
								<p v-if="npc.head.tribe">Tribe : {{ npc.head.tribe }}</p>
								<p v-if="npc.head.auspice">Auspice : {{ npc.head.auspice }}</p>
							</div>
							<div class="col">
								<p v-if="npc.head.kith">Kith : {{ npc.head.kith }}</p>
								<p v-if="npc.head.seeming">Seeming : {{ npc.head.seeming }}</p>
								<p v-if="npc.head.affiliation">Affiliation : {{ npc.head.affiliation }}</p>
								<p v-if="npc.head.tradition">Tradition : {{ npc.head.tradition }}</p>
								<p v-if="npc.head.convention">Convention : {{ npc.head.convention }}</p>
								<p v-if="npc.head.sect">Sect : {{ npc.head.sect }}</p>
								<p v-if="npc.head.generation">Generation : {{ npc.head.generation }}</p>
								<p v-if="npc.head.sect">Sect : {{ npc.head.sect }}</p>
								<p v-if="npc.head.clan">Clan : {{ npc.head.clan }}</p>
								<p v-if="npc.head.totem">Totem : {{ npc.head.totem }}</p>
							</div>
						</div>
						<q-separator class="q-mt-xl q-mb-md" />
						<div class="row q-col-gutter-xl">
							<div class="col">
								<h2>Notable Traits</h2>
								<div class="row q-col-gutter-xl">
									<div class="col">
										<h3 class="q-mt-none">Powers</h3>
										<NPCTraitScore label="Chicanery" :score="1" />
									</div>
									<div class="col">
										<h3 class="q-mt-none">Quirks, Merits, Flaws</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-4">
						<a v-if="portraitExists" :href="`/img/npcs/${slugify(npc.name)}.jpg`" target="_blank"
							><q-img :src="`/img/npcs/${slugify(npc.name)}.jpg`" class="rounded-borders" @error.prevent="portraitExists = false"
						/></a>
						<q-img
							v-if="!portraitExists"
							loading="lazy"
							:src="`/img/npcs/unknown_${npc.race}.jpg`"
							class="rounded-borders"
							@error="portraitExists = false"
						/>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Stats</h2>
				<div class="row q-col-gutter-xl">
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
				<h2>History</h2>
				<div class="row q-col-gutter-xl">
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !formattedHistory ? 'opacity-4' : '']">
							<q-card-section>
								<div class="prose">
									<p v-for="(paragraph, k) in formattedHistory" class="line-height-180" :key="`par_${k}`">{{ paragraph }}</p>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Personality</h2>
				<div class="row q-col-gutter-xl q-mb-xl">
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.likes ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="favorite" />
								<h3 class="q-mt-none q-mb-sm">Likes</h3>
								<div class="prose">{{ npc.personality.likes }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.dislikes ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="thumb_down" />
								<h3 class="q-mt-none q-mb-sm">Dislikes</h3>
								<div class="prose">{{ npc.personality.dislikes }}</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<div class="row q-col-gutter-xl q-mb-xl">
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.wants ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="filter_drama" />
								<h3 class="q-mt-none q-mb-sm">Wants and desires</h3>
								<div class="prose">{{ npc.personality.wants }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.rptips ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="theater_comedy" />
								<h3 class="q-mt-none q-mb-sm">Roleplaying tips</h3>
								<div class="prose">{{ npc.personality.rptips }}</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<div class="row q-col-gutter-xl q-mb-xl">
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.goals ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="sports_score" />
								<h3 class="q-mt-none q-mb-sm">Goals in life</h3>
								<div class="prose">{{ npc.personality.goals }}</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col">
						<q-card :class="['bg-grey-10 q-pa-sm', !npc.personality.habits ? 'opacity-4' : '']">
							<q-card-section>
								<q-avatar size="xl" round color="grey-9" class="personality_icon absolute" icon="golf_course" />
								<h3 class="q-mt-none q-mb-sm">Habits, occupations, hobbies</h3>
								<div class="prose">{{ npc.personality.habits }}</div>
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

import { ref, computed, onUpdated, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const npcID = ref(parseInt(route.params.id));

const { npcs } = storeToRefs(useNPCsStore());
const npc = ref(npcs.value.find((n) => n.id === npcID.value));

const portraitExists = ref(true);

const formattedHistory = computed(() => {
	let out = "";
	if (npc.value?.history) {
		out = npc.value?.history.split("\n") || "";
	}
	return out;
});

function slugify(str) {
	const out = str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w]+/g, "_")
		.replace(/^_|_$/g, "")
		.toLowerCase();
	return out;
}

onUpdated(() => {
	npcID.value = parseInt(route.params.id);
	portraitExists.value = true;
});

watch([npcs, npcID], (newVal) => {
	npc.value = npcs.value.find((n) => n.id === npcID.value);
});
</script>

<style scoped>
.personality_icon {
	transform: translate(-50%, -50%);
	border-radius: 1000px;
	top: 0;
	left: 0;
	overflow: hidden;
}

.prose p {
	line-height: 1.8;
	text-align: justify;
}
</style>
