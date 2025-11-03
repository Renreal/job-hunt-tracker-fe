import { supabase } from "../lib/supabaseClient";

export async function deleteUserData(id: string) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) throw new Error("User not logged in");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete record");
  }

  return res.json();
}



