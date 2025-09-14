import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import {bearer, genericOAuth, jwt} from "better-auth/plugins";
import {createAuthMiddleware} from "better-auth/api";
import { createPool } from "mysql2/promise";



const auth0 ={
    providerId: "auth0",
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    authorizationUrl: `${process.env.AUTH0_ISSUER_BASE_URL}/authorize`,
    tokenUrl: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    userInfoUrl: `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
    scopes: ["openid", "profile", "email", "offline_access"]
};

const entra = {
    providerId: "entra",
    clientId: process.env.ENTRA_AUTH_CLIENT_ID!,
    clientSecret: process.env.ENTRA_AUTH_CLIENT_SECRET!,
    authorizationUrl: `${process.env.ENTRA_AUTH_AUTHORITY}/oauth2/v2.0/authorize`,
    tokenUrl: `${process.env.ENTRA_AUTH_AUTHORITY}/oauth2/v2.0/token`,
    userInfoUrl: process.env.ENTRA_GRAPH_ME_ENDPOINT!,
    scopes: process.env.ENTRA_AUTH_SCOPE!.split(" "),
    redirectURI:"http://localhost:3000/api/auth/callback"
}

export const auth = betterAuth({
    database: createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "better-auth",
        port: 8889,
    }),
    plugins: [
        nextCookies(),
        bearer(),
        genericOAuth({
            config: [
                entra
            ],
        }),

    ],
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            console.log('after')

        }),
    },

});

