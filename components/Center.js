import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-cyan-500",
  "from-sky-500",
  "from-green-500",
  "from-emerald-500",
  "from-teal-500",
  "from-lime-500",
  "from-red-500",
  "from-rose-500",
  "from-yellow-500",
  "from-orange-500",
  "from-amber-500",
  "from-pink-500",
  "from-purple-500",
  "from-fuchsia-500",
  "from-violet-500",
  "from-gray-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="w-full text-white h-screen overflow-y-scroll scrollbar-hide pb-36">
      <header className="absolute top-5 right-8">
        <div
          className={`flex items-center bg-gradient-to-b ${color} to-[#ddd] shadow-lg space-x-3 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2`}
          onClick={signOut}
          title="Click to sign out"
        >
          <img
            src={session?.user.image}
            alt="User's picture"
            className="rounded-full w-10 h-10"
          />
          <h2 className="hidden md:inline-flex font-bold">
            {session?.user.name}
          </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex flex-col md:flex-row md:items-end md:space-x-7 bg-gradient-to-b to-black ${color} text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="md:w-44 md:h-44 shadow-2xl rounded-xl w-28 h-28 self-center md:self-end"
        />
        <div className="space-y-3">
          <p className="font-semibold mt-8">PLAYLIST</p>
          <h1 className="text-xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
          <p className="font-light text-justify">{playlist?.description}</p>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
