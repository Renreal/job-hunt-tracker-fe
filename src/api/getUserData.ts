import { supabase } from "../lib/supabaseClient";

export async function getUserData() {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) {
    return { error: "User not logged in" };
  }

  const res = await fetch("https://job-hunt-tracker-api-gateway.vercel.app/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
