<template>
	<q-page padding>
		<h1>Dashboard</h1>
		<h2>The Player Characters</h2>
		<div class="row q-gutter-lg">
			<div class="col">
				<router-link :to="{ name: 'pc_ahsha' }">
					<q-card dark bordered class="bg-grey-9 hover_scale_up">
						<q-card-section class="flex justify-between">
							<div class="text-h3 text-weight-bold">Ahsha Kelek</div>
							<q-avatar size="lg">
								<img src="/img/avatar_ahsha.jpg" />
							</q-avatar>
						</q-card-section>
						<q-separator inset />
						<q-card-section>
							<p>An insubordinate school psychologist</p>
						</q-card-section>
					</q-card>
				</router-link>
			</div>
			<div class="col">
				<router-link :to="{ name: 'pc_ariel' }">
					<q-card dark bordered class="bg-grey-9 hover_scale_up">
						<q-card-section class="flex justify-between">
							<div class="text-h3 text-weight-bold">Ariel Anderstone</div>
							<q-avatar size="lg">
								<img src="/img/avatar_ariel.jpg" />
							</q-avatar>
						</q-card-section>
						<q-separator inset />
						<q-card-section>
							<p>A high school student whose primsary concern is helping her peers</p>
						</q-card-section>
					</q-card>
				</router-link>
			</div>
			<div class="col">
				<router-link :to="{ name: 'pc_lucas' }">
					<q-card dark bordered class="bg-grey-9 hover_scale_up">
						<q-card-section class="flex justify-between">
							<div class="text-h3 text-weight-bold">Lucas Lunde</div>
							<q-avatar size="lg">
								<img src="/img/avatar_lucas.jpg" />
							</q-avatar>
						</q-card-section>
						<q-separator inset />
						<q-card-section>
							<p>An elementary school student whose life was turned around by tragedy and unhelpfulness</p>
						</q-card-section>
					</q-card>
				</router-link>
			</div>
		</div>
		<q-separator class="q-my-xl" />
		<h2 class="q-mb-sm">Useful Links</h2>
		<div class="row q-gutter-lg">
			<div class="col">
				<h3 class="q-mt-none q-mb-md">Music</h3>
				<q-list bordered separator>
					<q-item clickable v-ripple>
						<q-item-section><a href="https://cotm-music.netlify.app/" target="_blank">Playlist app</a></q-item-section>
					</q-item>
				</q-list>
			</div>
			<div class="col"></div>
			<div class="col"></div>
		</div>
	</q-page>
</template>

<script setup></script>

<style scoped>
.hover_scale_up {
	transition: transform 0.3s;
}
.hover_scale_up:hover {
	transform: scale(1.05);
}
</style>
