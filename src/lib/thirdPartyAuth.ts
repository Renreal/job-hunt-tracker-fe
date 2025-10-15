import { supabase } from "./supabaseClient";
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin + "/home" },
  });
};
export { handleGoogleLogin };