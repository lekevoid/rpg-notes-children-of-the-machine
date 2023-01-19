<template>
	<div class="pc_sheet">
		<h1>{{ character.name }}</h1>
		<div class="row q-gutter-lg">
			<div class="col-12 col-lg-7">
				<q-card class="q-pa-lg">
					<q-card-section>
						<div class="row q-gutter-lg">
							<div class="col">
								<p class="trait_name"><span class="text-weight-bold">Kith</span> : {{ character.kith }}</p>
								<p class="trait_name"><span class="text-weight-bold">Seeming</span> : {{ character.seeming }}</p>
							</div>
							<div class="col">
								<p class="trait_name"><span class="text-weight-bold">Court</span> : {{ character.court }}</p>
								<p class="trait_name"><span class="text-weight-bold">Legacies</span> : {{ character.legacies }}</p>
							</div>
							<div class="col">
								<p class="trait_name"><span class="text-weight-bold">House</span> : {{ character.house }}</p>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<h2 class="text-center q-my-none">Attributes</h2>
						<div class="row q-gutter-lg">
							<div class="col">
								<h3>Physical</h3>
								<PCTraitScore label="Strength" :score="character.strength" />
								<PCTraitScore label="Dexterity" :score="character.dexterity" />
								<PCTraitScore label="Stamina" :score="character.stamina" />
							</div>
							<div class="col">
								<h3>Social</h3>
								<PCTraitScore label="Charisma" :score="character.charisma" />
								<PCTraitScore label="Manipulation" :score="character.manipulation" />
								<PCTraitScore label="Appearance" :score="character.appearance" />
							</div>
							<div class="col">
								<h3>Mental</h3>
								<PCTraitScore label="Perception" :score="character.perception" />
								<PCTraitScore label="Intelligence" :score="character.intelligence" />
								<PCTraitScore label="Wits" :score="character.wits" />
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<h2 class="text-center q-mb-none">Abilities</h2>
						<div class="row q-gutter-lg">
							<div class="col">
								<h3>Talents</h3>
								<PCTraitScore label="Alertness" :score="character.alertness" />
								<PCTraitScore label="Athletics" :score="character.athletics" />
								<PCTraitScore label="Brawl" :score="character.brawl" />
								<PCTraitScore label="Empathy" :score="character.empathy" />
								<PCTraitScore label="Expression" :score="character.expression" />
								<PCTraitScore label="Intimidation" :score="character.intimidation" />
								<PCTraitScore label="Kenning" :score="character.kenning" />
								<PCTraitScore label="Leadership" :score="character.leadership" />
								<PCTraitScore label="Streetwise" :score="character.streetwise" />
								<PCTraitScore label="Subterfuge" :score="character.subterfuge" />
								<slot name="extra-talents"></slot>
							</div>
							<div class="col">
								<h3>Skills</h3>
								<PCTraitScore label="Animal Ken" :score="character.animal_ken" />
								<PCTraitScore label="Crafts" :score="character.crafts" />
								<PCTraitScore label="Drive" :score="character.drive" />
								<PCTraitScore label="Etiquette" :score="character.etiquette" />
								<PCTraitScore label="Firearms" :score="character.firearms" />
								<PCTraitScore label="Melee" :score="character.melee" />
								<PCTraitScore label="Performance" :score="character.performance" />
								<PCTraitScore label="Security" :score="character.security" />
								<PCTraitScore label="Stealth" :score="character.stealth" />
								<PCTraitScore label="Survival" :score="character.survival" />
								<slot name="extra-skills"></slot>
							</div>
							<div class="col">
								<h3>Knowledges</h3>
								<PCTraitScore label="Academics" :score="character.academics" />
								<PCTraitScore label="Computer" :score="character.computer" />
								<PCTraitScore label="Enigmas" :score="character.enigmas" />
								<PCTraitScore label="Gremayre" :score="character.gremayre" />
								<PCTraitScore label="Investigation" :score="character.investigation" />
								<PCTraitScore label="Law" :score="character.law" />
								<PCTraitScore label="Medicine" :score="character.medicine" />
								<PCTraitScore label="Politics" :score="character.politics" />
								<PCTraitScore label="Science" :score="character.science" />
								<PCTraitScore label="Technology" :score="character.technology" />
								<slot name="extra-knowledges"></slot>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<h2 class="text-center q-mb-none">Advantages</h2>
						<div class="row q-gutter-lg q-mb-lg">
							<div class="col">
								<h3>Backgrounds</h3>
								<PCTraitScore v-for="trait in backgrounds" :label="trait.label" :score="trait.score" :key="trait.label" />
							</div>
							<div class="col">
								<h3>Arts</h3>
								<PCTraitScore v-for="trait in arts" :label="trait.label" :score="trait.score" :key="trait.label" />
							</div>
							<div class="col">
								<h3>Realms</h3>
								<PCTraitScore v-for="trait in realms" :label="trait.label" :score="trait.score" :key="trait.label" />
							</div>
						</div>
						<div class="row q-gutter-lg">
							<div class="col">
								<h3>Other Traits</h3>
								<p class="trait_name q-mb-none" v-for="(trait, k) in otherTraits" :key="k">{{ trait }}</p>
							</div>
							<div class="col-8 q-pl-lg">
								<h3>&nbsp;</h3>
								<PCTraitScore label="Glamour" :score="character.glamour" :max="10" />
								<PCTraitScore label="Willpower" :score="character.willpower" :max="10" />
								<PCTraitScore label="Nightmare" :score="character.nightmare" :max="10" />
								<PCTraitScore label="Banality" :score="character.banality" :max="10" />
							</div>
						</div>
					</q-card-section>
				</q-card>
			</div>
			<div class="col">
				<q-card class="q-mb-lg">
					<q-carousel animated v-model="portraitPos" arrows navigation infinite>
						<q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
						<q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
						<q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
						<q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
					</q-carousel>
				</q-card>
				<q-card class="q-pa-lg q-mb-lg">
					<q-card-section>
						<h2 class="q-my-none">Details</h2>
						<div v-for="(entry, k) in character.details" :key="k">
							<h3>{{ entry.title }}</h3>
							<p v-for="(par, j) in entry.text" :key="j">{{ par }}</p>
						</div>
					</q-card-section>
				</q-card>
				<q-card class="q-pa-lg q-mb-lg">
					<q-card-section>
						<h2 class="q-my-none">Bought with XP</h2>
						<div v-for="(entry, k) in character.bought_with_xp" class="row" :key="k">
							<div class="col-4">{{ entry.date }}</div>
							<div class="col">{{ entry.text }}</div>
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script setup>
import PCTraitScore from "components/PCTraitScore.vue";

import { ref } from "vue";
const props = defineProps(["character"]);

const portraitPos = ref(1);

function sortByName(a, b) {
	if (a.label < b.label) {
		return -1;
	} else if (a.label > b.label) {
		return 1;
	}
	return 0;
}

function sortByScore(a, b) {
	if (a.score < b.score) {
		return 1;
	} else if (a.score > b.score) {
		return -1;
	}
	return 0;
}

const backgrounds = [...props.character.backgrounds].sort(sortByName);
const arts = [...props.character.arts].sort(sortByName).sort(sortByScore);
const realms = [...props.character.realms].sort(sortByName).sort(sortByScore);
const otherTraits = [...props.character.other_traits].sort();
</script>

<style scoped></style>
