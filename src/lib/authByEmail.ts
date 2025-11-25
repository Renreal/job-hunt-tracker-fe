import { supabase } from "./supabaseClient";

export const handleSignup = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);

    if (error.message.includes("rate")) {
      alert("Too many signup attempts. Please try again later.");
      return { 
        error: "Too many signup attempts. Please try again later." };
    }

    return { error: error.message };
  }

  if (data.session) {
    window.location.href = "/home";
    return { user: data.user }; 
  }
  return { user: data.user };
};
