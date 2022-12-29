<template>
	<q-page class="flex flex-center">
		<h1>Welcome Home Son</h1>
		<img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
	</q-page>
</template>

<script>
export default {
	name: "DashboardPage",
	data() {
		return {};
	},
	methods: {
		logout() {
			console.log("logged out");
		},
	},
};
</script>
