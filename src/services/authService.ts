import { supabase } from "../utils/supabaseClient";
import type { AdminUser } from "../models/userModel";
import { useAuthStore } from "../store/authStore";

export const authService = {
  // Fetch and set current user (profile)
  async getCurrentUser(): Promise<AdminUser | null> {
    const { setUser, setLoading } = useAuthStore.getState();
    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      setUser(null);
      setLoading(false);
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, email, role, display_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      setUser(null);
      setLoading(false);
      return null;
    }

    setUser(profile);
    setLoading(false);
    return profile;
  },

  // Sign in with email/password
  async signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return authService.getCurrentUser();
  },

  // Sign out
  async signOut() {
    const { logout } = useAuthStore.getState();
    await supabase.auth.signOut();
    logout();
  }
};
