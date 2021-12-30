import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currTrackId, setTrackId] = useRecoilState(currTrackIdState);
    const [songInfo, setSongInfo] = useState();
    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currTrackId}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + spotifyApi.getAccessToken(),
                        },
                    }
                ).then((res) => res.json());
                setSongInfo(trackInfo);
            }
        };
        fetchSongInfo();
    }, [currTrackId, spotifyApi]);
    return songInfo;
}

export default useSongInfo;
