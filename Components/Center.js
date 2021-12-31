import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { currPlaylistAtom, playlistIdAtom } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { MenuIcon } from "@heroicons/react/solid";
import { showAtom } from "../atoms/sidebarAtom";

function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playListId = useRecoilValue(playlistIdAtom);
    const [currPlaylist, setCurrPlaylist] = useRecoilState(currPlaylistAtom);
    const [show, setShow] = useRecoilState(showAtom);

    const colors = [
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ];

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playListId, currPlaylist]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playListId)
            .then((data) => setCurrPlaylist(data.body))
            .catch((error) => console.log("Something went wrong!", error));
    }, [playListId]);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide md:ml-40">
            <header>
                {show ? null : (
                    <div
                        className="p-2 rou text-white md:hidden absolute left-4 top-5 bg-black rounded-full"
                        onClick={() => setShow(true)}
                    >
                        <MenuIcon className="button" />
                    </div>
                )}
                <div
                    className="flex items-center space-x-3 m-2 p-2 pr-3 absolute right-4 top-2 bg-black rounded-full opacity-90 hover:opacity-80 cursor-pointer"
                    onClick={() => signOut()}
                >
                    <img
                        src={session?.user.image}
                        alt="profile image"
                        className="rounded-full w-7"
                    />
                    <p className="text-white truncate">
                        Hi {session?.user.name.split(" ")[0]}
                    </p>
                    <button className="flex items-center space-x-2 text-white">
                        <LogoutIcon className="h-5 w-5" />
                    </button>
                </div>
            </header>
            <section
                className={`flex items-end space-x-5 text-white bg-gradient-to-b to-black ${color} h-80 pl-5 pb-5`}
            >
                <img
                    src={currPlaylist?.images?.[0].url}
                    className="h-44 w-44 shadow-2xl"
                />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">
                        {currPlaylist?.name}
                    </h1>
                </div>
            </section>
            <div className="pb-24">
                <Songs />
            </div>
        </div>
    );
}

export default Center;
