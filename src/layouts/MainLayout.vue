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
					<NavLink title="Add a PC" caption="" icon="add" link="pc_add" />
				</div>
				<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('npc')">NPCs</q-item-label>
				<div v-if="openSubnavs.includes('npc')">
					<NavLink title="Add a NPC" caption="" icon="add" link="npc_add" />
				</div>
				<q-item-label header class="cursor-pointer" @click="toggleOpenSubnav('scene')">Scenes</q-item-label>
				<div v-if="openSubnavs.includes('scene')">
					<NavLink title="Add a Scene" caption="" icon="add" link="scene_add" />
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

const openSubnavs = ref(["pc"]);

function toggleOpenSubnav(val) {
	if (openSubnavs.value.includes(val)) {
		openSubnavs.value = openSubnavs.value.filter((e) => e !== val);
	} else {
		openSubnavs.value.push(val);
	}
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
