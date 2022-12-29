const routes = [
	{
		path: "/",
		component: () => import("layouts/IndexLayout.vue"),
		children: [
			{ path: "/", component: () => import("src/pages/IndexPage.vue") },
			{ path: "/login", component: () => import("src/pages/AuthPage.vue") },
		],
	},
	{
		path: "/dashboard",
		component: () => import("layouts/DashboardLayout.vue"),
		children: [{ path: "/", component: () => import("src/pages/DashboardPage.vue"), meta: { requiresAuth: true } }],
	},
	{
		path: "/pc",
		component: () => import("layouts/DashboardLayout.vue"),
		children: [{ path: "/:id", component: () => import("src/pages/PcPage.vue"), meta: { requiresAuth: true } }],
	},
	{
		path: "/npc",
		component: () => import("layouts/DashboardLayout.vue"),
		children: [{ path: "/:id", component: () => import("src/pages/NpcPage.vue"), meta: { requiresAuth: true } }],
	},
	{
		path: "/location",
		component: () => import("layouts/DashboardLayout.vue"),
		children: [{ path: "/:id", component: () => import("src/pages/LocationPage.vue"), meta: { requiresAuth: true } }],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
