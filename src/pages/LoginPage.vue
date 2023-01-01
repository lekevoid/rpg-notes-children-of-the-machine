<template>
	<q-page class="flex flex-center">
		<div>
			<button @click="handleLogin">Login with Google</button>
		</div>
	</q-page>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useSupabase from "boot/supabase";
const { supabase } = useSupabase();

const router = useRouter();
const { login } = useAuthUser();

const handleLogin = async () => {
	try {
		await login();
	} catch (error) {
		alert(error.message);
	}
};
</script>
