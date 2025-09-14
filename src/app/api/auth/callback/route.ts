// app/api/auth/callback/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code") ?? undefined;
    const state = url.searchParams.get("state") ?? undefined;

    return auth.api.oAuth2Callback({
       params: {providerId: "entra"}, // deve essere uguale al providerId nel genericOAuth
        query: { code, state },
        headers: req.headers,
        asResponse: true,
    });
}