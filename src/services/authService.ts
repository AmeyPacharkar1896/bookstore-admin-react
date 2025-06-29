import { supabase } from "../lib/supabaseClient";

export const authService = {
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, email, role, display_name")
      .eq("id", user.id)
      .single();

    if (profileError) return null;

    return profile;
  },

  async singInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    await supabase.auth.signOut;
  }
};
