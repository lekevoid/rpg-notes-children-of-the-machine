<template>
	<q-page padding class="page_notes">
		<h1>Epiphanies</h1>
		<div class="row q-col-gutter-lg q-mb-lg">
			<div class="col-7">
				<q-card class="full-width q-px-lg q-py-sm q-mb-lg">
					<h2>Reverie (Inspiration)</h2>
					<p class="q-mb-lg">Spend time with a human and inspiring them to tap into the Dreaming.</p>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p>1. Choose a Threshold :</p>
						</div>
						<div class="col-6">
							<q-chip
								v-for="{ icon, label, tooltip } in reverieThresholds"
								square
								class="glossy"
								color="blue-10"
								text-color="white"
								:icon="icon"
								:label="label"
								:key="label"
							>
								<q-tooltip class="bg-blue-grey-10 text-body2">{{ tooltip }}</q-tooltip>
							</q-chip>
						</div>
					</div>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p>2. Roll <b>Perception + Kenning {8}</b> to see how much time it'll take to understand your Dreamer :</p>
						</div>
						<div class="col-6">
							<q-table
								hide-bottom
								dense
								class="q-mb-lg"
								:rows="[
									{ successes: '1', time: 'A month' },
									{ successes: '2', time: 'Two weeks' },
									{ successes: '3', time: 'A week' },
									{ successes: '4', time: 'A day' },
									{ successes: '5+', time: 'A few hours' },
								]"
								:columns="[
									{ name: 'successes', label: 'Successes', field: 'successes', align: 'left' },
									{ name: 'time', label: 'Time', field: 'time', align: 'left' },
								]"
								row-key="successes"
							/>
						</div>
					</div>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p>
								3. Once you understand your dreamer, spend time with them to help them create (can take hours, days, weeks). Then roll
								<b>Manipulation + [Empathy / Leadership / Performance / Intimidation / relevant ability] {6}</b>.
							</p>
						</div>
						<div class="col-6">
							<q-table
								hide-bottom
								dense
								class="q-mb-lg"
								:rows="[
									{ successes: '5+ Successes', effect: 'If you followed your Threshold, gain 1 Permanent Glamour.' },
									{ successes: '1+ Successes', effect: 'Gain 1 Glamour per success.' },
									{ successes: '0 Success', effect: 'Player must spend another week with the Dreamer before trying again' },
									{
										successes: 'Botch',
										effect: 'Dreamer breaks. They roll relevant [Attribute + Ability] and compare with table above to know how long before they can create again.',
									},
								]"
								:columns="[
									{ name: 'successes', label: 'Successes', field: 'successes', align: 'left' },
									{ name: 'effect', label: 'Effect', field: 'effect', align: 'left', style: 'white-space:normal;' },
								]"
								row-key="successes"
							/>
						</div>
					</div>
				</q-card>
				<q-card class="full-width q-px-lg q-py-sm q-mb-lg">
					<h2>Revelry (Kith)</h2>
					<p class="q-mb-lg">
						Use a way unique to your Kith to gain Glamour. This can be used only once per story. There's no roll, only roleplaying. Spend 1 scene in
						Revelry to completely refill your Glamour pool.
					</p>
					<div>
						<q-table
							hide-bottom
							dense
							class="q-mb-lg"
							:pagination="{ rowsPerPage: 20 }"
							:rows="revelries"
							:columns="[
								{ name: 'kith', label: 'Kith', field: 'kith', align: 'left' },
								{ name: 'revelry', label: 'Revelry', field: 'revelry', align: 'left', style: 'white-space:normal;' },
							]"
							row-key="kith"
						/>
					</div>
				</q-card>
			</div>
			<div class="col-5">
				<q-card class="full-width q-px-lg q-py-sm q-mb-lg">
					<h2>Rapture (Self-Inspiration)</h2>
					<p class="q-mb-lg">
						Let your human nature reach out and touch the Dreaming as though you were a Dreamer. Create an art piece or other inspired piece.
					</p>
					<p class="q-mb-lg">1. Choose an ability your character is proficient at or inspired by.</p>
					<p class="q-mb-lg">
						2. Roll <b>Perception + Kenning {8}</b>, same result table as for Reverie. This tells you ow long to get inspired to create your piece.
					</p>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p>3. Roll <b>[Relevant Attribute + Ability] {Banality - Glamour + 6}</b> to create the piece.</p>
						</div>
						<div class="col-6">
							<q-table
								hide-bottom
								dense
								class="q-mb-lg"
								:rows="[
									{ successes: '5+', effect: 'Gain 1 Permanent Glamour and completely refill your pool.' },
									{ successes: '0+ successes', effect: 'Gain 1 Glamour per success.' },
									{
										successes: 'Botch',
										effect: 'Self-confidence shatters. Gain 1 Banality and wait a week to try again.',
									},
								]"
								:columns="[
									{ name: 'successes', label: 'Successes', field: 'successes', align: 'left' },
									{ name: 'effect', label: 'Effect', field: 'effect', align: 'left', style: 'white-space:normal;' },
								]"
								row-key="successes"
							/>
						</div>
					</div>
				</q-card>
				<q-card class="full-width q-px-lg q-py-sm q-mb-lg">
					<h2>Ravaging (Theft)</h2>
					<p class="q-mb-lg">
						Rip the Glamour away from a mortal. This obviously can taint the Glamour and cause damage to the Dreamer. Victims can't create anything
						for at least one day per point stolen. Repeated violations can make the victim drained, depressed, and even extinguished forever.
					</p>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p class="q-mb-lg">1. Form a relationship with your target. You must know their name and have an idea of what inspires them.</p>
							<p class="q-mb-lg">2. Roll <b>Banality {6}</b>.</p>
						</div>
						<div class="col-6">
							<q-table
								hide-bottom
								dense
								class="q-mb-lg"
								:rows="[
									{ successes: '1+ Successes', effect: 'Gain 1 Glamour per success.' },
									{ successes: '0 Success', effect: 'Gain 1 Banality.' },
									{
										successes: 'Botch',
										effect: 'Ravaging backfires and rips your psyche. Gain 1 Permanent Banality.',
									},
								]"
								:columns="[
									{ name: 'successes', label: 'Successes', field: 'successes', align: 'left' },
									{ name: 'effect', label: 'Effect', field: 'effect', align: 'left', style: 'white-space:normal;' },
								]"
								row-key="successes"
							/>
						</div>
					</div>
				</q-card>
				<q-card class="full-width q-px-lg q-py-sm q-mb-lg">
					<h2>Rhapsody (Destruction)</h2>
					<p class="q-mb-lg">Destroy a Dreamer by imbuing them with so much Glamour that they produce one final masterpiece and then burn out.</p>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p>1. Choose a Threshold (definitions are pretty much just the opposite of Reverie Thresholds) :</p>
						</div>
						<div class="col-6">
							<q-chip
								v-for="{ icon, label } in rhapsodyThresholds"
								square
								class="glossy"
								color="red-10"
								text-color="white"
								:icon="icon"
								:label="label"
								:key="label"
							/>
						</div>
					</div>
					<div class="row q-col-gutter-lg q-mb-lg">
						<div class="col-6">
							<p class="q-mb-lg">1. Form a relationship with your target. You must know their name and have an idea of what inspires them.</p>
							<p class="q-mb-lg">2. Roll <b>Banality {6}</b>.</p>
						</div>
						<div class="col-6">
							<q-table
								hide-bottom
								dense
								class="q-mb-lg"
								:rows="[
									{ successes: '1+ Successes', effect: 'Gain 1 Glamour per success.' },
									{ successes: '0 Success', effect: 'Gain 1 Banality.' },
									{
										successes: 'Botch',
										effect: 'Ravaging backfires and rips your psyche. Gain 1 Permanent Banality.',
									},
								]"
								:columns="[
									{ name: 'successes', label: 'Successes', field: 'successes', align: 'left' },
									{ name: 'effect', label: 'Effect', field: 'effect', align: 'left', style: 'white-space:normal;' },
								]"
								row-key="successes"
							/>
						</div>
					</div>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script setup>
import { ref, computed } from "vue";

const reverieThresholds = [
	{ icon: "tips_and_updates", label: "Inspire Creativity", tooltip: "Inspire artists to create art" },
	{ icon: "auto_awesome", label: "Create Hope", tooltip: "Foster optimism and hope, espoecially in one who has lost it" },
	{ icon: "favorite", label: "Create Love", tooltip: "Love always wins" },
	{ icon: "spa", label: "Create Calm", tooltip: "Encourage the person to be calm enough to create or solve their problems" },
	{ icon: "handshake", label: "Foster Trust", tooltip: "Help people have faith and trust in one another" },
	{ icon: "support", label: "Help Those in Need", tooltip: "Some need guidance, others need to overcome addiction to be able to Dream again" },
	{ icon: "nights_stay", label: "Foster Dreams", tooltip: "If you dream hard enough, things will come true" },
];

const rhapsodyThresholds = [
	{ icon: "mood_bad", label: "Exhaust Creativity" },
	{ icon: "flood", label: "Destroy Hope" },
	{ icon: "heart_broken", label: "Destroy Love" },
	{ icon: "whatshot", label: "Create Anger" },
	{ icon: "group_off", label: "Break Trust" },
	{ icon: "vaccines", label: "Exploit Dependence" },
	{ icon: "cloud_off", label: "Destroy Illusions" },
];

const revelries = [
	{ kith: "Boggan", revelry: "Do a boring, tedious task to help someone, even better if it's without their knowing." },
	{ kith: "Clurichaun", revelry: "Share your exploits with a fellow collector. A good brawl also works." },
	{
		kith: "Eshu",
		revelry: "Share stories with fellow storytellers, or participate in an event you've helped set in motion : flash mob, protest...",
	},
	{
		kith: "Nocker",
		revelry: "Spend time in your shop tinkering with a non-magical device, or work with fellow engineers to brainstorm on a new device.",
	},
	{ kith: "Piskey", revelry: "Complete and total immersion in a group. Rites of passage, births, deaths are especially potent." },
	{ kith: "Pooka", revelry: "Play an elaborate prank. Also, spend relaxing and free time in an open and wild place." },
	{
		kith: "Redcap",
		revelry: "Take in the horror of somebody being afraid, disgusted or unnerved. Also, discover a new taste experienced for the first time.",
	},
	{ kith: "Satyr", revelry: "Share a passion, pleasure and intense emotions." },
	{ kith: "Selkie", revelry: "Spend time in water, or share deep, sad, and tempestuous passions." },
	{
		kith: "Arcadian Sidhe",
		revelry: "Being the purest embodiment of the Dreaming, and inspiring adoration and admiration in others.",
	},
	{ kith: "Autumn Sidhe", revelry: "Share the company of creative leaders who think outside the box." },
	{
		kith: "Sluagh",
		revelry:
			"Slinking through forbidden tunnels, learning new secrets, playing to their reputation as recluses. Also, scaring wicked or selfish people 'straight'.",
	},
	{ kith: "Troll", revelry: "Tending to their oaths, or maintaining what they have, Also, contests of athleticism." },
];
</script>

<style></style>
