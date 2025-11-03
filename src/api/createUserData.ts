import { supabase } from "../lib/supabaseClient";

export interface CreateUserPayload {
  company: string;
  location: string;
  platform: string;
  position: string;
  status: string;
  date: string; // ISO or YYYY-MM-DD
}

export async function createUserData(payload: CreateUserPayload) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  if (!token) throw new Error("User not logged in");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create entry: ${res.status} ${text}`);
  }

  return res.json();
}
