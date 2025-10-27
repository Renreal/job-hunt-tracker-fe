import { supabase } from "../lib/supabaseClient";

const session = await supabase.auth.getSession();
const token = session.data.session?.access_token;
