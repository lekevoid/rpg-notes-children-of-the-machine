<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated style="background-image: url('/img/bg.jpg')">
			<q-toolbar>
				<q-toolbar-title> Quasar App </q-toolbar-title>
				<a href="/dashboard">Dashboard</a>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup></script>
