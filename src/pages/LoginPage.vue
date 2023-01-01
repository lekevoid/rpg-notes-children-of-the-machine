<template>
	<q-page class="flex flex-center">
		<div>
			<button @click="handleLogin">Login with Google</button>
		</div>
	</q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { login, isLoggedIn } = useAuthUser();

const handleLogin = async () => {
	try {
		await login();
	} catch (error) {
		alert(error.message);
	}
};

onMounted(() => {
	if (isLoggedIn.value) {
		router.push({ name: "dashboard" });
	}
});
</script>
