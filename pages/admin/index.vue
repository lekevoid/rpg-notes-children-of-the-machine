<template>
	<NuxtLayout name="admin">
		<h1>Weeeeeeeeee</h1>
		<button @click="saveFile()">Save</button>
		<pre>{{ contentQuery }}</pre>
	</NuxtLayout>
</template>

<script setup>
fs = require("fs");

const contentQuery = await queryContent("/")
	.where({ title: { $contains: "Test" } })
	.findOne();

function saveFile() {
	console.log("weeeeeeeeeeeeee");
	fs.writeFile("/content/blah.json", { title: "madelaine avait" }, "utf8");
}
</script>
