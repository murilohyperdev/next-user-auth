'use server';

import { AuthError } from "next-auth";
import { signIn } from "@/app/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const response = await signIn("credentials", 
      {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false
      }
    )
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}