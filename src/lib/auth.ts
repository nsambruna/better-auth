import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import {bearer, genericOAuth} from "better-auth/plugins";
import { Pool } from "pg";



const auth0 ={
    providerId: "auth0",
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    authorizationUrl: `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?audience=${process.env.AUTH0_AUDIENCE}`,
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
        database: new Pool({
            connectionString: `${process.env.POSTGRES_CONNECTION}`,
        }),
    plugins: [
        nextCookies(),
        bearer(),
        genericOAuth({
            config: [
                process.env.NEXT_PUBLIC_PROVIDER === 'entra' ?  entra : auth0
            ],
        }),

    ],
/*    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            console.log('after')

        }),
    },*/

});

