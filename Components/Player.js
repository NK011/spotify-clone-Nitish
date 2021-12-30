import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { VolumeUpIcon } from "@heroicons/react/outline";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
    RewindIcon,
    PauseIcon,
    PlayIcon,
    FastForwardIcon,
    ReplyIcon,
    SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

function Player() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currTrackId, setTrackId] = useRecoilState(currTrackIdState);
    const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo(currTrackId);

    const fetchSongInfo = () => {
        if (!songInfo) {
            spotifyApi
                .getMyCurrentPlayingTrack()
                .then((data) => setTrackId(data.body.item.id));

            spotifyApi
                .getMyCurrentPlaybackState()
                .then((data) => setisPlaying(data.body.is_playing));
        }
    };

    useEffect(() => {
        if (!spotifyApi.getAccessToken() && !currTrackId) {
            fetchSongInfo();
            setVolume(50);
        }
    }, [currTrackId, spotifyApi, session]);

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setisPlaying(false);
            } else {
                spotifyApi.play();
                setisPlaying(true);
            }
        });
    };

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume);
        }
    }, [volume]);

    const debounceAdjustVolume = useCallback(
        debounce(
            (volume) =>
                spotifyApi.setVolume(volume).catch((error) => {
                    alert(error.message);
                }),
            500
        ),
        []
    );

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0]?.url}
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p className="text-sm text-gray-500">
                        {songInfo?.artists?.[0]?.name}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    onClick={() => spotifyApi.skipToPrevious()}
                    className="button"
                />
                {isPlaying ? (
                    <PauseIcon
                        className="button w-10 h-10"
                        onClick={handlePlayPause}
                    />
                ) : (
                    <PlayIcon
                        className="button w-10 h-10"
                        onClick={handlePlayPause}
                    />
                )}
                <FastForwardIcon
                    onClick={() => spotifyApi.skipToNext()}
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button" />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    min={0}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    max={100}
                />
                <VolumeUpIcon className="button" />
            </div>
        </div>
    );
}

export default Player;
