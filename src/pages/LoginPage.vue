<template>
	<q-page class="flex flex-center">
		<div class="fixed btn_wrapper">
			<q-btn size="24px" round color="dark" icon="img:/img/logo_google.png" @click="handleLogin" class="hover-yellow-shadow" />
		</div>
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

<style scoped>
.btn_wrapper {
	bottom: 20px;
	right: 20px;
}

.hover-yellow-shadow {
	transition: box-shadow 0.6s;
}

.hover-yellow-shadow:hover {
	box-shadow: 0px 0px 50px #ff0;
}
</style>
