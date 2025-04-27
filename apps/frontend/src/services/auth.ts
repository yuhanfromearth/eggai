import {
  createClient,
  Session,
  type SupabaseClient,
} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export const authService = {
  async signUp(email: string, password: string, displayName?: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return { message: "Check your email for the confirmation link" };
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Incorrect email or password.");
      }
      throw new Error(error.message || "An unknown error occurred.");
    }

    return data.session;
  },

  async getAuthStatus(): Promise<boolean> {
    const { data, error } = await supabase.auth.getSession();

    if (!data) {
      console.error("Auth status check failed:", error);
      return false;
    }

    return !!data.session;
  },

  async getSession(): Promise<Session> {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      throw new Error("Error: Couldn't retrieve user session.");
    }

    return data.session;
  },
};
