<template>
	<q-page padding class="page_scenes">
		<h1>Stories</h1>
		<q-card>
			<q-tabs v-model="tab" align="left" class="bg-dark text-white">
				<q-tab class="text-blue-grey-1" name="timeline" icon="schema" label="Timeline" />
				<q-tab class="text-green" name="ahsha" icon="img:/img/avatar_ahsha.jpg" label="Ahsha" />
				<q-tab class="text-indigo-9" name="ariel" icon="img:/img/avatar_ariel.jpg" label="Ariel" />
				<q-tab class="text-red-9" name="lucas" icon="img:/img/avatar_lucas.jpg" label="Lucas" />
				<q-tab class="text-blue-8" name="the_machine" icon="settings" label="The Machine" />
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

				<q-tab-panel name="ahsha">
					<h2 class="q-mt-lg q-mb-md">Personal Quests : Ahsha</h2>
					<StoryCollapsesList :entries="stories_ahsha" icon="emoji_nature" />
				</q-tab-panel>
				<q-tab-panel name="ariel">
					<h2 class="q-mt-lg q-mb-md">Personal Quests : Ariel</h2>
					<StoryCollapsesList :entries="stories_ariel" icon="emoji_nature" />
				</q-tab-panel>
				<q-tab-panel name="lucas">
					<h2 class="q-mt-lg q-mb-md">Personal Quests : Lucas</h2>
					<StoryCollapsesList :entries="stories_lucas" icon="emoji_nature" />
				</q-tab-panel>
				<q-tab-panel name="the_machine">
					<h2 class="q-mt-lg q-mb-md">The Machine</h2>
					<StoryCollapsesList :entries="stories_the_machine" icon="settings" />
					<h3>What is the Machine</h3>
					<p>The machine is the dream of a powerful Fomorian.</p>
					<p>
						Nobody knows since when it has existed, but it's been around at least since WW1. Back then it was known by the Kithain in Germany as
						Dominiendere Gewahrsamsmaschine mit Unendichen Gesichtern (Dominating Machine of Custody with Infinite Faces) ; Shortened to DoGeMa, or
						Dogma. Today, if somebody were to seek its name, it would be known in North America as Dogma, Panoptical Orbit of Dependence.
					</p>
					<p>
						Dogma wants society to run efficiently, according to righteous codes of conduct. It sees humans as incapable of escaping the chains of
						their own mediocrity. In the late 1800's, it manifested in Germany, where it tried to help society industrialize, and transmit righteous
						progressist ideals to the children by strict state-run education. It bore fruit, and by the 1910's, Germany was ready to spread its
						ideals to the world.
					</p>
					<p>
						Dogma was only marginally defeated, and it was due to a complex web of circumstances. There was a group of Changelings, called
						<i>Gedächtnis den Heimweg zum Nisten</i> (Remember the way home to the nest), shortened to <i>Geheimnis</i> (Mystery). Geheimnis found a
						path to Dogma's dream, pictured as a huge machine, and disrupted its gears. This combined with many other events involving other
						supernaturals, put Dogma on its backfoot. It came back years later for WW2, this time not only involving children but also polluting the
						Glamour in the country and everywhere else, which attracted a ton of Thallain, Nephandi etc. Obviously it still didn't succeed.
					</p>
					<p>It tried once again during the Cold War, with a more subtle approach. Its mistake that time, was to take too long.</p>
					<p>
						It's trying again today, in a peaceful society. Dogma understands the imminent climate danger and knows Canada is well positioned. If
						reasons that by the time it takes over Canada, it'll be one of the most resourceful nations on Earth, and it'll be able to expand to the
						US, Russia, China, etc.
					</p>
					<p>
						However, Canada has a hidden weapon. Its vast territory is home to a variety of Changelings, Feras, Mages and other things that could
						pose a threat. It wants to eliminate their power by a number of ways, which includes genociding the remaining First Nations who have a
						surprising number of powerful Supernaturals and Nodes.
					</p>
				</q-tab-panel>

				<q-tab-panel name="peer_counseling">
					<h2 class="q-mt-lg q-mb-md">Peer Counseling</h2>
					<StoryCollapsesList :entries="stories_peer_counseling" icon="psychology" />
				</q-tab-panel>

				<q-tab-panel name="golf_metaberoutin">
					<h2 class="q-mt-lg q-mb-md">Golf Métabéroutin</h2>
					<StoryCollapsesList :entries="stories_golf_metaberoutin" icon="golf_course" />
				</q-tab-panel>

				<q-tab-panel name="other_supernaturals">
					<h2 class="q-mt-lg q-mb-md">Games of Supernaturals</h2>
					<StoryCollapsesList :entries="stories_supernaturals" icon="supernatural" />
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import { date } from "quasar";
const tab = ref("timeline");

import StoryCollapsesList from "components/StoryCollapsesList.vue";

import stories_timeline from "data/stories_timeline.json";
import stories_ahsha from "data/stories_ahsha.json";
import stories_ariel from "data/stories_ariel.json";
import stories_lucas from "data/stories_lucas.json";
import stories_the_machine from "data/stories_the_machine.json";
import stories_peer_counseling from "data/stories_peer_counseling.json";
import stories_golf_metaberoutin from "data/stories_golf_metaberoutin.json";
import stories_supernaturals from "data/stories_supernaturals.json";

const show_timeline_ahsha = ref(true);
const show_timeline_ariel = ref(true);
const show_timeline_lucas = ref(true);

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

useMeta(() => {
	return {
		title: "Story",
	};
});
</script>

<style>
.page_scenes .q-expansion-item .q-item__label {
	position: relative;
	bottom: 2px;
}

.page_scenes .q-tabs .q-icon img {
	border-radius: 50%;
}
</style>
