import { supabase } from "../lib/supabaseClient";

export type UpdateUserPayload = {
  position?: string;
  status?: string;
  date?: string;
  platform?: string;
  company?: string;
  location?: string;
  timestamp?: string;
};

export async function updateUserData(id: string, updates: UpdateUserPayload) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) {
    throw new Error("User not logged in");
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error(`Failed to update user data: ${res.statusText}`);
  }

  return res.json();
}
