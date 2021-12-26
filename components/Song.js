import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch((err) => console.log("Something went wrong", err));
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-400 py-5 px-4 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="max-w-[8px] mr-4">{order + 1}</p>
        <img
          className="md:w-20 md:h-20 rounded-lg w-12 h-12"
          src={track?.track.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="text-white font-semibold truncate w-24 md:w-36 lg:w-64">
            {track?.track.name}
          </p>
          <p className="w-40">{track?.track.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-10">
        <p className="w-40 hidden md:inline">{track?.track.album?.name}</p>
        <p>{millisToMinutesAndSeconds(track?.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
