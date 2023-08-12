import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden font-sans">
      <Head>
        <title>Spotify clone</title>
        <link
          rel="icon"
          href="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
        />
        <meta
          name="google-site-verification"
          content="zyzvDGg6YDmmNckIKRqYM8AoWIlq46qEfknum53C5sU"
        />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
