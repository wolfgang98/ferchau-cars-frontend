import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Account, AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    session: async ({ session, user }: { session: Session, token: JWT, user: AdapterUser }) => {
      
      (session as any).jwt = (user as any).jwt;
      (session as any).id = (user as any).id;
      return Promise.resolve(session);
    },
    jwt: async ({ user, token, account } : { user: User | AdapterUser, token: JWT, account: Account }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
        );
        const data = await response.json();
        console.log(data);
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options as AuthOptions);

export default Auth;