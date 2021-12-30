import { useRecoilState } from "recoil";
import { currTrackIdState, isPlayingState } from "../atoms/songAtom";
import { millisToMinutesAndSeconds } from "../lib/time";
import useSpotify from "../hooks/useSpotify";

function Song({ track, order }) {
    const spotifyApi = useSpotify();
    const [TrackId, setTrackId] = useRecoilState(currTrackIdState);
    const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setTrackId(track.track.id);
        setisPlaying(true);
        spotifyApi
            .play({ uris: [track.track.uri] })
            .then(() => {})
            .catch((error) => alert(error.message));
    };
    return (
        <div
            className="grid grid-cols-2 text-[#929292] hover:text-white hover:bg-[#2b2d30] cursor-pointer"
            onClick={playSong}
        >
            <div className="flex items-center space-x-5 pl-3 py-1">
                <p>{order + 1}</p>

                <img
                    src={track.track.album.images[0].url}
                    className="w-10 h-10"
                    alt={track.track.album.name}
                />

                <div>
                    <p className="w-36 truncate lg:w-[20rem] text-white">
                        {track.track.name}
                    </p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0 pr-10">
                <p className="hidden md:inline-block w-40 lg:w-96 truncate">
                    {track.track.album.name}
                </p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    );
}

export default Song;
