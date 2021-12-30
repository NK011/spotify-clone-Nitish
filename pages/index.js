import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../Components/Center";
import Player from "../Components/Player";
import Siidebar from "../Components/Siidebar";

export default function Home() {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone by Nitish</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex">
                <Siidebar />
                <Center />
            </main>

            <div className="sticky bottom-0">
                <Player />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
