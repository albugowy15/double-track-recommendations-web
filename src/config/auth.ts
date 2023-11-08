import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { type LoginResponseData } from '@/app/api/login/route';

import { type APIResponse } from '@/types/api';
import { env } from '@/env.mjs';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: LoginResponseData & DefaultSession['user'];
  }
}

export const protectedPaths = ['/auth/login'];

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
        role: {
          label: 'Role',
          type: 'text',
        },
      },
      async authorize(credentials) {
        const loginEndpoint =
          credentials?.role == 'admin'
            ? `${env.API_URL}/v1/admin/login`
            : `${env.API_URL}/v1/siswa/login`;
        const requestBody = {
          username: credentials?.username,
          password: credentials?.password,
        };
        const res = await fetch(loginEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });
        const data: APIResponse<LoginResponseData> = await res.json();
        console.log(data);
        if (res.ok && data.data) {
          return data.data;
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
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
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

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
