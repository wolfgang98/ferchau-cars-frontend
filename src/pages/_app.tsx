import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Session } from "next-auth";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();

  return (
    <div className={inter.className}>
      <SessionProvider session={session}>
        <Component key={router.asPath} {...pageProps} />
      </SessionProvider>
    </div>
  );
}
