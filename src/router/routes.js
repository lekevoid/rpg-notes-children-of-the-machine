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
		children: [{ path: "", name: "dashboard", component: () => import("pages/DashboardPage.vue"), meta: { requiresAuth: true } }],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
