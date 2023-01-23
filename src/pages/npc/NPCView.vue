<template>
	<q-page padding>
		<NPCSheetSkeleton v-if="!npc || !npc.head" />
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
						<div class="row q-col-gutter-xl" v-if="organizedNotablePowers || npc.notable_traits?.quirks[0] !== ''">
							<div class="col">
								<h2>Notable Traits</h2>
								<div class="row q-col-gutter-xl">
									<div class="col_powers col-4" v-for="(powers, type) in organizedNotablePowers" :key="type">
										<template v-if="powers[0].name !== ''">
											<h3 class="q-mt-none">Powers</h3>
											<h4>{{ type }}</h4>
											<NPCTraitScore
												v-for="trait in powers.sort(sortByScoreThenName)"
												:label="trait.name"
												:score="trait.score"
												:max="5"
												:key="trait.name"
											/>
										</template>
									</div>
									<div class="col-4" v-if="npc?.notable_traits?.quirks && npc.notable_traits.quirks[0] !== ''">
										<h3 class="q-mt-none">Quirks, Merits, Flaws</h3>
										<p v-for="quirk in npc.notable_traits.quirks" :key="quirk">{{ quirk }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-4">
						<pre>{{ portraits }}</pre>
						<q-card class="q-mb-lg">
							<q-carousel animated v-model="portraitPos" :arrows="portraits.length > 1" infinite>
								<template v-for="(portrait, k) in portraits">
									<q-carousel-slide v-if="portraitsAvailVariations[portrait.id]" class="q-pa-none" :name="k" :key="k">
										<q-img :src="portrait.src" spinner-color="white" @error="portraitsAvailVariations[portrait.id] = false" />
										<div class="absolute-bottom text-subtitle2 text-center custom-caption q-pa-sm" v-if="portrait.caption">
											<div class="text-subtitle1">{{ portrait.caption }}</div>
										</div>
									</q-carousel-slide>
								</template>
							</q-carousel>
						</q-card>
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Stats</h2>
				<div class="row q-col-gutter-xl">
					<div class="col">
						<NPCTraitScore label="Combat" :score="npc.stats.Combat" />
						<NPCTraitScore label="Stealth" :score="npc.stats.Stealth" />
						<NPCTraitScore label="Soak" :score="npc.stats.Soak" />
						<NPCTraitScore label="Strength" :score="npc.stats.Strength" />
					</div>
					<div class="col">
						<NPCTraitScore label="Charisma" :score="npc.stats.Charisma" />
						<NPCTraitScore label="Empathy" :score="npc.stats.Empathy" />
						<NPCTraitScore label="Manipulation" :score="npc.stats.Manipulation" />
						<NPCTraitScore label="Self-Control" :score="npc.stats['Self-Control']" />
					</div>
					<div class="col">
						<NPCTraitScore label="Alertness" :score="npc.stats.Alertness" />
						<NPCTraitScore label="Culture" :score="npc.stats.Culture" />
						<NPCTraitScore label="Knowledge" :score="npc.stats.Knowledge" />
						<NPCTraitScore label="Willpower" :score="npc.stats.Willpower" />
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

import { ref, reactive, computed, onUpdated, onMounted, watch } from "vue";
import { useNPCsStore } from "stores/npcs";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const npcID = ref(parseInt(route.params.id));

const { npcs } = storeToRefs(useNPCsStore());
const { getNPC } = useNPCsStore();

const npc = computed(() => {
	return npcs.value.find((n) => n.id === npcID.value);
});

const portraits = ref([]);
const portraitsAvailVariations = { normal: true, apocalyptic: true, crinos: true, lupus: true, seeming: true, mien: true };
const portraitPos = ref(0);

async function fetchPortraits() {
	if (npc.value?.name) {
		let out = [];
		const variations = [
			{ id: "normal", src: `/img/npcs/${slugify(npc.value.name)}.jpg` },
			{ id: "apocalyptic", src: `/img/npcs/${slugify(npc.value.name)}_apocalyptic.jpg`, caption: "Apocalyptic Form" },
			{ id: "crinos", src: `/img/npcs/${slugify(npc.value.name)}_crinos.jpg`, caption: "Crinos Form" },
			{ id: "lupus", src: `/img/npcs/${slugify(npc.value.name)}_lupus.jpg`, caption: "Lupus Form" },
			{ id: "seeming", src: `/img/npcs/${slugify(npc.value.name)}_seeming.jpg`, caption: "Human Seeming" },
			{ id: "mien", src: `/img/npcs/${slugify(npc.value.name)}_mien.jpg`, caption: "Fae Mien" },
		];

		for (const variation of variations) {
			try {
				fetch(variation.src).then((res) => {
					console.log(res);
					if (res.ok) {
						portraits.value.push(variation);
					}
				});
			} catch (e) {
				console.log("no portrait for variation", variation, e);
			}
		}
	}
}

const formattedHistory = computed(() => {
	let out = "";
	if (npc.value?.history) {
		out = npc.value.history.split("\n") || "";
	}
	return out;
});

const organizedNotablePowers = computed(() => {
	let out = {};

	if (npc.value?.notable_traits?.powers) {
		for (const trait of npc.value.notable_traits.powers) {
			if (!out[trait.type]) {
				out[trait.type] = [];
			}
			out[trait.type].push(trait);
		}
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

function sortByScoreThenName(a, b) {
	if (a.score > b.score) {
		return -1;
	}
	if (a.score < b.score) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

onMounted(() => {
	fetchPortraits();
});

watch(npc, (npc) => {
	console.log("npc has a name", npc.name);
	fetchPortraits();
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

.col_powers:not(:first-child) h3 {
	opacity: 0;
}

.q-carousel__slide > .q-img {
	height: 100%;
}

.q-carousel__slide > [class*="caption"] {
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
