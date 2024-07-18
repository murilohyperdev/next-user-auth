  import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from '@/app/auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider({
    async authorize(credentials) :Promise<any> {
      if (credentials.user === null) return null;
      try {
        const user = await getUser(credentials?.email);
        if (user) {
          return user;
        } else {
          throw new Error('user not found')
        }
      } catch (error) {
        
      }
    }
  })], // Add providers with an empty array for now
} satisfies NextAuthConfig;