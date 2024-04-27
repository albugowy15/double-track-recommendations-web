import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { type APIResponse } from "@/types/api";
import { env } from "@/env.mjs";

export interface LoginResponseData {
  token: string;
  role: "admin" | "student";
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: LoginResponseData & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        type: {
          label: "Type",
          type: "text",
        },
      },
      async authorize(credentials) {
        const requestBody = {
          username: credentials?.username,
          password: credentials?.password,
          type: credentials?.type,
        };
        const loginUrl = env.NEXT_PUBLIC_API_URL + "/v1/auth/login";
        const res = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const response = (await res.json()) as APIResponse<LoginResponseData>;
        if (res.ok && response.data) {
          return {
            id: "",
            token: response.data.token,
            role: response.data.role,
          };
        } else {
          console.error("error: ", response);
          throw Error(response.error);
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
          role: token.role,
          token: token.token,
        },
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
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
