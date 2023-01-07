<template>
	<q-list class="flex column justify-between q-pb-md" style="height: 100%">
		<NavLink title="Dashboard" caption="" icon="dashboard" link="dashboard" />
		<q-item-label header class="text-font-title text-h4 cursor-pointer" @click="toggleOpenSubnav('pc')">PCs</q-item-label>
		<div v-if="true || openSubnavs.includes('pc')">
			<NavLink title="Ahsha Kelek" caption="" icon="img:/img/avatar_ahsha.jpg" link="pc_ahsha" />
			<NavLink title="Ariel Anderstone" caption="" icon="img:/img/avatar_ariel.jpg" link="pc_ariel" />
			<NavLink title="Lucas Lunde" caption="" icon="img:/img/avatar_lucas.jpg" link="pc_lucas" />
		</div>
		<q-item-label header class="text-font-title text-h4 cursor-pointer flex items-center justify-between" @click="toggleOpenSubnav('npc')">
			<span style="position: relative; top: 1px; line-height: 0.8">NPCs</span>
			<q-btn round size="sm" color="dark" icon="view_list" :to="{ name: 'npc_view_all' }" />
		</q-item-label>
		<div v-if="openSubnavs.includes('npc')">
			<div class="row q-px-md q-pb-md q-gutter-sm">
				<div class="col flex flex-center">
					<q-btn
						size="md"
						:color="showHumanNPCs ? 'green-10' : 'grey-10'"
						icon="person_outline"
						@click="toggleShowHumanNPCs()"
						class="full-width glossy"
					/>
				</div>
				<div class="col flex flex-center">
					<q-btn
						size="md"
						:color="showChangelingNPCs ? 'green-10' : 'grey-10'"
						icon="img:/img/icon_changeling.png"
						@click="toggleShowChangelingNPCs()"
						class="full-width glossy"
					/>
				</div>
				<div class="col flex flex-center">
					<q-btn
						size="md"
						:color="showOtherSpernaturalNPCs ? 'green-10' : 'grey-10'"
						icon="img:/img/icon_supernatural.png"
						@click="toggleShowOtherSpernaturalNPCs()"
						class="full-width glossy"
					/>
				</div>
			</div>
			<NavLinkNPC v-for="character in visibleNpcs" :character="character" :key="character.id" />
		</div>
		<!-- <q-item-label header class="text-font-title text-h4 cursor-pointer" @click="toggleOpenSubnav('scene')">Scenes</q-item-label>
		 <div v-if="openSubnavs.includes('scene')">
			<NavLink title="Add a Scene" caption="" icon="add" link="scene_add" />
		</div> -->
		<q-item-label header class="text-font-title text-h4 cursor-pointer flex items-center justify-between q-mt-lg"> Setting </q-item-label>
		<NavLink title="Locations" caption="" icon="explore" link="scene_view_all" />
		<NavLink title="Stories" caption="" icon="auto_stories" link="story_view_all" />
		<q-space />
		<q-item clickable class="nav_link">
			<q-item-section avatar>
				<q-icon name="home_repair_service" />
			</q-item-section>
			<q-item-section>
				<q-item-label style="font-size: 0.7rem; line-height: 1">Tools</q-item-label>
			</q-item-section>
			<q-menu anchor="bottom end" self="bottom left">
				<q-list style="min-width: 200px">
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
import NavLinkNPC from "components/NavLinkNPC.vue";

import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";

import { useNPCsStore } from "stores/npcs";

const { logout } = useAuthUser();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const openSubnavs = ref(["pc"]);
const showHumanNPCs = ref(true);
const showChangelingNPCs = ref(true);
const showOtherSpernaturalNPCs = ref(true);

const { npcs } = storeToRefs(useNPCsStore());
const visibleNpcs = computed(() => {
	return npcs.value
		.map((c) => {
			if (showHumanNPCs.value && (!c.race || ["human"].includes(c.race))) {
				return c;
			}
			if (showChangelingNPCs.value && c.race === "changeling") {
				return c;
			}
			if (c.race && !["human", "changeling"].includes(c.race) && showOtherSpernaturalNPCs.value) {
				return c;
			}
			return null;
		})
		.filter(Boolean);
});

function toggleOpenSubnav(val) {
	if (openSubnavs.value.includes(val)) {
		openSubnavs.value = openSubnavs.value.filter((e) => e !== val);
	} else {
		openSubnavs.value.push(val);
	}
}

function toggleShowHumanNPCs() {
	showHumanNPCs.value = !showHumanNPCs.value;
}

function toggleShowChangelingNPCs() {
	showChangelingNPCs.value = !showChangelingNPCs.value;
}

function toggleShowOtherSpernaturalNPCs() {
	showOtherSpernaturalNPCs.value = !showOtherSpernaturalNPCs.value;
}

const handleLogout = async () => {
	$q.dialog({ title: "Log out", message: "Do you really ?", cancel: true, persistent: true }).onOk(async () => {
		await logout();
		router.replace("/login");
	});
};

onMounted(() => {
	for (const e of ["pc", "npc", "scene"]) {
		const checkRegexp = new RegExp(`^\/${e}`);
		if (route.path.match(checkRegexp)) {
			openSubnavs.value = [e];
		}
	}
});
</script>
