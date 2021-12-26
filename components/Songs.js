import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  // We dont need the setPlaylist here because it was set before
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-5 text-white">
      {playlist &&
        playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i} />
        ))}
    </div>
  );
}

export default Songs;
