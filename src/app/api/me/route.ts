import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import {headers} from "next/headers";

export async function GET(req: Request) {
    // recupera la sessione utente
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ottieni l'access token per auth0
    const {accessToken}  = await auth.api.getAccessToken({
        body: {
            providerId: "entra",
        },
        headers: await headers(),
    });
    return NextResponse.json({ accessToken });
}