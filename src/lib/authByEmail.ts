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
      return { error: "Too many signup attempts. Please try again later." };
    }

    return { error: error.message };
  }

  // Successful signup: user needs to confirm email
  if (data.user && !data.session) {
    return { message: "Check your email to confirm your signup." };
  }

  // If session exists (rare for signup), redirect
  if (data.session) {
    window.location.href = "/home";
  }

  return { user: data.user };
};
