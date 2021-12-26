import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black w-full min-h-screen justify-center">
      <Head>
        <title>Spotify clone</title>
        <link
          rel="icon"
          href="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
        />
      </Head>

      <img className="w-52 mb-8" src="https://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white py-4 px-6 rounded-full font-semibold"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
