import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient = createClient(
    process.env.DATABASE_URL!,
    process.env.SUPABASE_KEY!,
  );

  async signUp(email: string, password: string, display_name?: string) {
    const { error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: display_name,
        },
      },
    });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    console.log(
      'If this email address is new, a verification link has been sent. If you already have an account, you can use the "Forgot Password" option to access your account.',
    );
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    console.log('User successfully logged in.');
  }
}
