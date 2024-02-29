import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connect } from "@/services/connectDB";
import userModel from "@/models/user";
import { compare } from "@/utils/crypto";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          required: true,
        },

        password: {
          label: "password",
          type: "password",
          required: true,
        },
      },

      async authorize(credentials, req): Promise<User | null> {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          await connect();

          const foundUser = await userModel.findOne({
            email: credentials.email,
          });

          if (
            foundUser &&
            (await compare(credentials.password, foundUser.password))
          ) {
            return foundUser;
          }
        } catch (err) {
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        if (session.name) {
          token.name = session.name;
        }
        if (session.email) {
          token.email = session.email;
        }
      }
      return token;
    },

    async session({ session, token, user, trigger }) {
      if (session.user && token.email && token.name) {
        session.user = {
          email: `${token.email}`,
          name: `${token.name}`,
        };
      }

      return {
        ...session,
      };
    },
  },

  secret: "HeLlOAEZakMi@1",

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};