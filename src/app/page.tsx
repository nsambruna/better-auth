"use client";

import {authClient} from "@/lib/auth-client";
import {useState} from "react";

export  function GetTokenButton() {
    const [token, setToken] = useState<string | null>(null);

    async function handleClick() {
        try {
            const res = await fetch("/api/me");
            const data = await res.json();

            if (data?.accessToken) {
                console.log("Access token:", data);
                setToken(data.accessToken);
            } else {
                console.warn("Nessun token trovato", data);
            }
        } catch (err) {
            console.error("Errore fetch /api/me:", err);
        }
    }

    return (
        <div className="flex flex-col gap-2 mt-4">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Get Server-side Token
            </button>

            {token && (
                <pre className="bg-gray-100 p-3 rounded break-all max-w-lg">
          {token}
        </pre>
            )}
        </div>
    );
}

export  function LoginButton() {
    const { data: session } = authClient.useSession();

    if (session) {
        return (
            <div>
                Benvenuto {session.user?.name || session.user?.email}
                <button onClick={() => authClient.signOut()}>Logout</button>
            </div>
        );
    }

    return (
        <button onClick={() => authClient.signIn.oauth2({ providerId: process.env.NEXT_PUBLIC_PROVIDER!
        })}>
            Login con {process.env.NEXT_PUBLIC_PROVIDER}
        </button>
    );
}

export default function Home() {


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
<GetTokenButton />
            .
          </li>
          <li className="tracking-[-.01em]">
              <LoginButton />
          </li>
        </ol>


      </main>
    </div>
  );
}
