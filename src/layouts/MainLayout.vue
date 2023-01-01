<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

				<q-toolbar-title> Quasar App </q-toolbar-title>

				<div><button @click="handleLogout">Logout</button></div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('pc')">PCs</q-item-label>
				<div v-if="openSubnavs.includes('pc')">
					<NavLink title="Add a PC" caption="" icon="add" link="/add/pc" />
				</div>
				<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('npc')">NPCs</q-item-label>
				<div v-if="openSubnavs.includes('npc')">
					<NavLink title="Add a NPC" caption="" icon="add" link="/add/pc" />
				</div>
				<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('location')">Locations</q-item-label>
				<div v-if="openSubnavs.includes('location')">
					<NavLink title="Add a Location" caption="" icon="add" link="/add/pc" />
				</div>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import NavLink from "components/NavLink.vue";

const router = useRouter();
const { logout } = useAuthUser();

const $q = useQuasar();

const handleLogout = async () => {
	$q.dialog({ title: "Log out", message: "Do you really ?", cancel: true, persistent: true }).onOk(async () => {
		await logout();
		router.replace("/login");
	});
};

const openSubnavs = ref([]);

function toggleOpenSubnav(val) {
	if (openSubnavs.value.includes(val)) {
		openSubnavs.value = openSubnavs.value.filter((e) => e !== val);
	} else {
		openSubnavs.value.push(val);
	}
}

const linksList = [
	{
		title: "Docs",
		caption: "quasar.dev",
		icon: "school",
		link: "https://quasar.dev",
	},
	{
		title: "Github",
		caption: "github.com/quasarframework",
		icon: "code",
		link: "https://github.com/quasarframework",
	},
	{
		title: "Discord Chat Channel",
		caption: "chat.quasar.dev",
		icon: "chat",
		link: "https://chat.quasar.dev",
	},
	{
		title: "Forum",
		caption: "forum.quasar.dev",
		icon: "record_voice_over",
		link: "https://forum.quasar.dev",
	},
	{
		title: "Twitter",
		caption: "@quasarframework",
		icon: "rss_feed",
		link: "https://twitter.quasar.dev",
	},
	{
		title: "Facebook",
		caption: "@QuasarFramework",
		icon: "public",
		link: "https://facebook.quasar.dev",
	},
	{
		title: "Quasar Awesome",
		caption: "Community Quasar projects",
		icon: "favorite",
		link: "https://awesome.quasar.dev",
	},
];

const leftDrawerOpen = ref(false);
const NavLinks = linksList;

const loggedIn = false;

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
