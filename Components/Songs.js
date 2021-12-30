import { useRecoilValue } from "recoil";
import { currPlaylistAtom } from "../atoms/playListAtom";
import Song from "./Song";

function Songs() {
    const currPlaylist = useRecoilValue(currPlaylistAtom);
    return (
        <div className="pb-5 space-y-2">
            {currPlaylist?.tracks.items.map((track, i) => (
                <div key={track.track.id}>
                    <Song track={track} order={i} />
                </div>
            ))}
        </div>
    );
}

export default Songs;
