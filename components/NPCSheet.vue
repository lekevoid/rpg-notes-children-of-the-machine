<template>
	<div class="npc_sheet">
		<pre>{{ data }}</pre>
		<ContentDoc v-slot="{ doc }">
			<h1>{{ doc.title }}</h1>
			<ContentRenderer :value="doc" />
		</ContentDoc>
	</div>
</template>

<script setup lang="ts"></script>
