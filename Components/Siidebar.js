import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon,
    LoginIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdAtom } from "../atoms/playListAtom";
import { showAtom } from "../atoms/sidebarAtom";
import useSpotify from "../hooks/useSpotify";

function Siidebar() {
    const { data: session, state } = useSession();
    const spotifyApi = useSpotify();
    const [playlist, setPlaylist] = useState([]);
    const [playListId, setplayLlstid] = useRecoilState(playlistIdAtom);
    const [show, setShow] = useRecoilState(showAtom);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi
                .getUserPlaylists()
                .then((data) => setPlaylist(data.body.items));
        }
    }, [session, spotifyApi]);

    return (
        <div
            className={` ${
                show ? "showSidebar" : "hideSideBar"
            } md:showSidebar h-screen text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll scrollbar-hide pb-36`}
        >
            <div className="space-y-4">
                {show ? (
                    <button
                        className="flex items-center space-x-2 hover:text-white"
                        onClick={() => setShow(false)}
                    >
                        <XIcon className="h-5 w-5 text-red-800" />
                        <p>Close</p>
                    </button>
                ) : null}
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-700" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5 text-green-800" />
                    <p>Your Episode</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                {playlist.map((playlist) => (
                    <p
                        key={playlist.id}
                        className="cursor-pointer hover:text-white"
                        onClick={() => setplayLlstid(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Siidebar;
