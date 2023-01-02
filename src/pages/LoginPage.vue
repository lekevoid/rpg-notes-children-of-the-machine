<template>
	<q-page class="flex flex-center">
		<transition appear enter-active-class="animated fadeIn">
			<button @click="handleLogin">Login with Google</button>
		</transition>
	</q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
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

const checkLogin = setInterval(() => {
	if (isLoggedIn.value) {
		router.replace({ name: "dashboard" });
		clearInterval(checkLogin);
	}
}, 100);

onBeforeUnmount(() => {
	clearInterval(checkLogin);
});
</script>
