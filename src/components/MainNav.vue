<template>
	<q-list class="flex column no-wrap justify-between q-pb-md" style="height: 100%">
		<NavLink title="Dashboard" icon="dashboard" link="dashboard" />
		<q-item-label header class="text-font-title text-h4 cursor-pointer">Characters</q-item-label>
		<NavLink title="Ahsha Kelek" icon="img:/img/avatar_ahsha.jpg" link="pc_ahsha" />
		<NavLink title="Ariel Anderstone" icon="img:/img/avatar_ariel.jpg" link="pc_ariel" />
		<NavLink title="Lucas Lunde" icon="img:/img/avatar_lucas.jpg" link="pc_lucas" />
		<NavLink title="NPCs" icon="groups" link="npc_view_all" />
		<q-item-label header class="text-font-title text-h4 cursor-pointer flex items-center justify-between q-mt-lg"> Setting </q-item-label>
		<NavLink title="Locations" icon="explore" link="scene_view_all" />
		<NavLink title="Stories" icon="auto_stories" link="story_view_all" />
		<NavLink title="Notes" icon="checklist" link="notes_view_all" />
		<!-- <q-item clickable class="nav_link">
			<q-item-section avatar>
				<q-icon name="checklist" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Notes</q-item-label>
			</q-item-section>
			<q-menu anchor="bottom end" self="bottom middle">
				<q-list style="min-width: 140px">
					<q-item clickable class="flex no-wrap" :to="{ name: 'notes_powers' }">
						<q-item-section style="flex: 0 0 20px"><q-icon name="offline_bolt" /></q-item-section>
						<q-item-section>
							<q-item-label>Powers</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator dark />
					<q-item clickable class="flex no-wrap" :to="{ name: 'notes_epiphanies' }">
						<q-item-section style="flex: 0 0 20px"><q-icon name="emoji_objects" /></q-item-section>
						<q-item-section>
							<q-item-label>Epiphanies</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-item> -->
		<q-space />
		<q-item clickable class="nav_link q-mt-xl">
			<q-item-section avatar>
				<q-icon name="home_repair_service" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Tools</q-item-label>
			</q-item-section>
			<q-menu anchor="bottom end" self="bottom middle">
				<q-list style="min-width: 140px">
					<q-item clickable class="flex no-wrap" :to="{ name: 'npc_add' }">
						<q-item-section style="flex: 0 0 20px"><q-icon name="add" /></q-item-section>
						<q-item-section>
							<q-item-label>Add a NPC</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator dark />
					<q-item clickable class="flex no-wrap" @click="handleLogout">
						<q-item-section style="flex: 0 0 20px"><q-icon name="logout" /></q-item-section>
						<q-item-section>
							<q-item-label>Log out</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-item>
	</q-list>
</template>

<script setup>
import NavLink from "components/NavLink.vue";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";

const { logout } = useAuthUser();
const $q = useQuasar();
const router = useRouter();

const handleLogout = async () => {
	$q.dialog({ title: "Log out", message: "Do you really ?", cancel: true, persistent: true }).onOk(async () => {
		await logout();
		router.replace("/login");
	});
};
</script>
