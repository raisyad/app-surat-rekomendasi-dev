import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import { User } from "@/lib/user.model";

// import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const { email, password } = credentials;

        const user: User | null = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user) return null;

        // const userPassword = user?.password || '';
        // // const isValidPassword = await compare(password, userPassword);
        // const isValidPassword = bcrypt.compare(password, userPassword);
        // console.log("HALO BANG ? ",userPassword, isValidPassword)

        // if (!isValidPassword) return null;

        // console.log(user);
        // return user;
        // console.log("User object from database:", user);

        const token = {
          id: `${user.id}`,
          email: `${user.email}`,
          password: `${user.password}`,
          isRole: `${user.isRole}` // Add this line to include isRole in the token
        };
      
        return token;
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signOut",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      // console.log("INI USER : ", user);

      if (trigger === "update" && session?.user?.email) {
        token.email = session?.user?.email
        session.email = token.email
        console.log("HAHAHAHAHAHAHA AWOK AWOK: ", token.email, session?.user?.email)
        return session
      }
      if (account?.provider === "credentials") {
        // console.log("ini jwt: ",trigger, session)
        token.email = user.email
        token.isRole = (user as User).isRole;
      }
      // account?.access_token
      // console.log(account?.access_token);
      return token
    },

    async session({ session, token, trigger, account }: any) {
      // console.log("ini session: ", trigger, session, account)
      if (session?.user?.email) {
        session.email = session?.user?.email
        session.user.email = session.email
        return session
      }

      if ("email" in token) {
        session.user.email = token.email;
        session.user.isRole = token.isRole;
        console.log(session);
      }
      return session
    }

  }

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };