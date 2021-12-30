import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
    return (
        <div className="h-screen w-screen bg-black flex justify-center items-center">
            <div className="h-40 text-whitev flex flex-col justify-center items-center">
                <img
                    src="https://links.papareact.com/9xl"
                    className="w-16 m-5"
                    alt="spotify logo"
                />
                {Object.values(providers).map((provider) => (
                    <div className="text-white text-base" key={provider.id}>
                        <button
                            className="bg-[#1DB954] rounded-xl p-2"
                            onClick={() =>
                                signIn(provider.id, { callbackUrl: "/" })
                            }
                        >
                            Login in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
