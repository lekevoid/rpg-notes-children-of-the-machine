<template>
	<router-view />
</template>

<script setup>
// USEFUL IMPORTS
import { onMounted } from "vue";
import { useQuasar } from "quasar";

// FETCH ALL THE THINGS AND STORE 'EM
import usePopulateStores from "src/composables/UsePopulateStores";
onMounted(() => {
	usePopulateStores();
});

// SET DARK
const $q = useQuasar();
$q.dark.set(true);
</script>
