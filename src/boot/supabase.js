import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((evt, session) => {
	const { user } = useAuthUser();
	user.value = session?.user || null;
});

export default function useSupabase() {
	return { supabase };
}
