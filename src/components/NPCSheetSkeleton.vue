<template>
	<div>
		<q-card class="q-pa-lg">
			<q-card-section>
				<h2>Main Information</h2>
				<q-skeleton type="QInput" />
			</q-card-section>
			<q-card-section>
				<div class="row q-gutter-lg">
					<div class="col">
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
					</div>
					<div class="col">
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
					</div>
					<div class="col">
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
						<q-skeleton type="QInput" class="q-mb-lg" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Stats</h2>
				<div class="row q-gutter-lg">
					<div class="col">
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
					</div>
					<div class="col">
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
					</div>
					<div class="col">
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
						<q-skeleton type="text" class="q-mb-sm" />
					</div>
				</div>
			</q-card-section>
			<q-card-section>
				<h2>Personality</h2>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
				</div>
				<div class="row q-gutter-lg q-mb-lg">
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
					<div class="col">
						<q-skeleton type="QInput" />
					</div>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import TraitScore from "components/TraitScore.vue";
import { ref } from "vue";
const stat = ref(1);
</script>
