import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { type LoginResponseData } from '@/app/api/login/route';

import { type APIResponse } from '@/types/api';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
        isAdmin: {
          label: 'AdminLogin',
          type: 'text',
        },
      },
      async authorize(credentials) {
        const baseUrl = env.BASE_URL;
        const res = await fetch(`${baseUrl}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const { data: user }: APIResponse<LoginResponseData> = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
