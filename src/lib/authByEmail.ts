import { supabase } from "./supabaseClient";

export const handleSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const { data: existingUser, error: existingError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing email:", existingError.message);
  }

  if (existingUser) {
    return { error: "This email is already in use. Please log in instead." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    return { error: error.message };
  }

  const user = data.user;
  console.log("User signed up:", user);

  if (user && !data.session) {
    return { message: "Check your email to confirm your signup." };
  }

  if (data.session) {
    window.location.href = "/home";
  }

  return { user };
};
