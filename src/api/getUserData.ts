import { supabase } from "../lib/supabaseClient";

export async function getUserData(search: string) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) {
    return { error: "User not logged in" };
  }

  const url = new URL(`${import.meta.env.VITE_API_URL}/users`);
  if (search) {
    url.searchParams.append("search", search);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user data: ${res.statusText}`);
  }

  return res.json();
}
