<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated style="background-image: url('/img/bg.jpg')">
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
				<q-toolbar-title>Children of the Machine</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<q-drawer v-model="leftDrawerOpen" show-if-above bordered style="background-image: url('/img/bg.jpg')">
			<MainNav />
		</q-drawer>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";

import MainNav from "components/MainNav.vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
