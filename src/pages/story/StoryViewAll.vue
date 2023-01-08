<template>
	<q-page padding>
		<h1>Stories</h1>
		<q-card>
			<q-tabs v-model="tab" align="left" class="bg-dark text-white">
				<q-tab class="text-blue" name="timeline" icon="schema" label="Timeline" />
				<q-tab class="text-deep-orange" name="peer_counseling" icon="psychology" label="Peer Counseling" />
				<q-tab class="text-green" name="golf_metaberoutin" icon="golf_course" label="Golf Métabéroutin" />
				<q-tab class="text-purple" name="other_supernaturals" icon="img:/img/icon_supernatural_purple.png" label="Supernaturals" />
			</q-tabs>
			<q-separator />
			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="timeline">
					<h2>Timeline</h2>
					<div class="q-gutter-sm flex no-wrap items-center">
						<p class="q-my-none">Show timeline events related to :</p>
						<q-checkbox class="q-my-none text-p" v-model="show_timeline_ahsha" label="Ahsha" color="green" />
						<q-checkbox class="q-my-none text-p" v-model="show_timeline_ariel" label="Ariel" color="indigo-9" />
						<q-checkbox class="q-my-none text-p" v-model="show_timeline_lucas" label="Lucas" color="red-9" />
					</div>
					<div class="q-px-lg q-py-sm bg-grey-10 text-white">
						<q-timeline color="blue">
							<q-timeline-entry
								v-for="timelineDate in filtered_stories_timeline"
								:title="timelineDate.overtitle"
								:subtitle="date.formatDate(`${timelineDate.date}T11:00:00`, 'dddd, MMMM D, YYYY')"
								:icon="timelineDate.icon"
								:key="timelineDate.date"
							>
								<div class="row no-wrap" v-for="(entry, k) in timelineDate.entries" :key="timelineDate.date + k">
									<div class="relative">
										<q-avatar
											v-for="(person, n) in entry.who"
											:key="person"
											size="40px"
											class="overlapping absolute"
											:style="`left: ${n * 20}px`"
										>
											<img :src="`/img/avatar_${person}.jpg`" />
										</q-avatar>
									</div>
									<div class="q-pl-xl q-pt-sm q-pb-md">
										<p v-for="(entryText, j) in entry.text" :key="timelineDate.date + k + j" class="q-mt-none q-mb-xs">{{ entryText }}</p>
									</div>
								</div>
							</q-timeline-entry>
						</q-timeline>
					</div>
				</q-tab-panel>

				<q-tab-panel name="peer_counseling">
					<h2>Peer Counseling</h2>
					<div class="peer_counseling_files_list row q-col-gutter-lg">
						<div
							v-for="(entry, k) in stories_peer_counseling"
							:class="['peer_counseling_card_wrapper q-mb-xl', activePeerCounselingCard === entry.title ? 'active col-11' : 'inactive col-4']"
							:key="`peer_counseling_${k}`"
						>
							<q-card bordered :class="[entry.initiated ? 'bg-grey-10 text-white' : 'uninitiated text-light-blue']">
								<q-card-section class="cursor-pointer" @click="togglePeerCounselingCard(entry.title)">
									<div class="text-h4">{{ entry.title }}</div>
								</q-card-section>
								<q-separator dark inset />
								<q-card-section :class="[activePeerCounselingCard === entry.title ? '' : 'ellipsis-5-lines']">
									<p v-for="(par, j) in entry.text" :key="`peer_counseling_${k}_${j}`">{{ par }}</p>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</q-tab-panel>

				<q-tab-panel name="golf_metaberoutin">
					<h2>Golf Métabéroutin</h2>
					<q-card
						v-for="(entry, k) in stories_golf_metaberoutin"
						bordered
						:class="['q-mb-xl', entry.initiated ? 'bg-grey-10 text-white' : 'uninitiated text-light-blue']"
						:key="`supernaturals_${k}`"
					>
						<q-card-section class="cursor-pointer" @click="togglePeerCounselingCard(entry.title)">
							<div class="text-h4">{{ entry.title }}</div>
						</q-card-section>
						<q-separator dark inset />
						<q-card-section>
							<p v-for="(par, j) in entry.text" :key="`peer_counseling_${k}_${j}`">{{ par }}</p>
						</q-card-section>
					</q-card>
				</q-tab-panel>

				<q-tab-panel name="other_supernaturals">
					<h2>Games of Supernaturals</h2>
					<q-card
						v-for="(entry, k) in stories_supernaturals"
						bordered
						:class="['q-mb-xl', entry.initiated ? 'bg-grey-10 text-white' : 'uninitiated text-light-blue']"
						:key="`supernaturals_${k}`"
					>
						<q-card-section>
							<div class="text-h4">{{ entry.title }}</div>
						</q-card-section>
						<q-separator dark inset />
						<q-card-section>
							<p v-for="(par, j) in entry.text" :key="`peer_counseling_${k}_${j}`">{{ par }}</p>
						</q-card-section>
					</q-card>
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { date } from "quasar";
const tab = ref("timeline");

import stories_timeline from "assets/data/stories_timeline.json";
import stories_peer_counseling from "assets/data/stories_peer_counseling.json";
import stories_golf_metaberoutin from "assets/data/stories_golf_metaberoutin.json";
import stories_supernaturals from "assets/data/stories_supernaturals.json";

const show_timeline_ahsha = ref(true);
const show_timeline_ariel = ref(true);
const show_timeline_lucas = ref(true);

const activePeerCounselingCard = ref("");

function togglePeerCounselingCard(val) {
	console.log(activePeerCounselingCard.value, val);
	if (activePeerCounselingCard.value === val) {
		activePeerCounselingCard.value = "";
	} else {
		activePeerCounselingCard.value = val;
	}
}

const filtered_stories_timeline = computed(() => {
	return stories_timeline.map((s) => {
		const filteredEntries = s.entries
			.map((e) => {
				if (show_timeline_ahsha.value && e.who.includes("ahsha")) {
					return e;
				}
				if (show_timeline_ariel.value && e.who.includes("ariel")) {
					return e;
				}
				if (show_timeline_lucas.value && e.who.includes("lucas")) {
					return e;
				}
				return null;
			})
			.filter(Boolean);

		return { ...s, entries: filteredEntries };
	});
});
</script>

<style scoped>
.initiated {
	opacity: 1;
}

.uninitiated {
	opacity: 0.6;
}

.q-card.uninitiated {
	background-color: #000828;
}

.peer_counseling_card_wrapper {
	transition: width 0.3s ease, flex 0.3s ease;
}

.peer_counseling_card_wrapper .ellipsis-5-lines {
	overflow: hidden;
	padding-bottom: 0;
	margin-bottom: 1rem;
}
</style>
