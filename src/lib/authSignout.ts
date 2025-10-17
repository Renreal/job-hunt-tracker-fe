import { supabase } from "./supabaseClient";

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return { error: error.message };
  }

  window.location.href = "/";
  return { success: true };
};
