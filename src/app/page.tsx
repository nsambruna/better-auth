"use client";

import Image from "next/image";
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
        <button onClick={() => authClient.signIn.oauth2({ providerId: "auth0"
        })}>
            Login con auth0
        </button>
    );
}

export default function Home() {


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
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
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
