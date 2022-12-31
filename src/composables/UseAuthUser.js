import { ref } from "vue";
import useSupabase from "boot/supabase";

const user = ref(null);

export default function useAuthUser() {
	const { supabase } = useSupabase();

	const login = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${import.meta.env.VITE_SITE_URL}/dashboard` },
		});

		if (error) {
			throw error;
		}

		return data;
	};

	const logout = async () => {
		const { data, error } = await supabase.auth.signOut();

		if (error) {
			throw error;
		}

		return data;
	};

	const isLoggedIn = () => {
		return !!user.value;
	};

	return { user, login, logout, isLoggedIn };
}
