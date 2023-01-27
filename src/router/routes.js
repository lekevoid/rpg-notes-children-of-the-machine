const routes = [
	{
		path: "/",
		component: () => import("layouts/LoginLayout.vue"),
		children: [
			{ path: "", name: "home", component: () => import("pages/LoginPage.vue") },
			{ path: "/login", name: "login", component: () => import("pages/LoginPage.vue") },
		],
	},
	{
		path: "/dashboard",
		component: () => import("layouts/MainLayout.vue"),
		children: [{ path: "", name: "dashboard", component: () => import("pages/DashboardPage.vue") }],
		meta: { requiresAuth: true },
	},
	{
		path: "/pc",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "", name: "pc_view_all", component: () => import("pages/pc/PCViewAll.vue") },
			{ path: "/pc/add", name: "pc_add", component: () => import("pages/pc/PCAdd.vue") },
			{ path: "/pc/edit/:id", name: "pc_edit", component: () => import("pages/pc/PCEdit.vue") },
			{ path: "/pc/ahsha-kelek", name: "pc_ahsha", component: () => import("pages/pc/PCAhshaKelek.vue") },
			{ path: "/pc/ariel-anderstone", name: "pc_ariel", component: () => import("pages/pc/PCArielAnderstone.vue") },
			{ path: "/pc/lucas-lunde", name: "pc_lucas", component: () => import("pages/pc/PCLucasLunde.vue") },
		],
		meta: { requiresAuth: true },
	},
	{
		path: "/npc",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "", name: "npc_view_all", component: () => import("pages/npc/NPCViewAll.vue") },
			{ path: "/npc/add", name: "npc_add", component: () => import("pages/npc/NPCAdd.vue") },
			{ path: "/npc/view/:id", name: "npc_view", component: () => import("pages/npc/NPCView.vue") },
			{ path: "/npc/edit/:id", name: "npc_edit", component: () => import("pages/npc/NPCEdit.vue") },
		],
		meta: { requiresAuth: true },
	},
	{
		path: "/scene",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "", name: "scene_view_all", component: () => import("pages/scene/SceneViewAll.vue") },
			{ path: "/scene/add", name: "scene_add", component: () => import("pages/scene/SceneAdd.vue") },
			{ path: "/scene/edit/:id", name: "scene_edit", component: () => import("pages/scene/SceneEdit.vue") },
		],
		meta: { requiresAuth: true },
	},
	{
		path: "/story",
		component: () => import("layouts/MainLayout.vue"),
		children: [{ path: "", name: "story_view_all", component: () => import("pages/story/StoryViewAll.vue") }],
		meta: { requiresAuth: true },
	},
	{
		path: "/notes",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{ path: "", name: "notes_view_all", component: () => import("pages/notes/NotesViewAll.vue") },
			{ path: "/powers", name: "notes_powers", component: () => import("pages/notes/NotesPowers.vue") },
			{ path: "/epiphanies", name: "notes_epiphanies", component: () => import("pages/notes/NotesEpiphanies.vue") },
		],
		meta: { requiresAuth: true },
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
