import { createAuthClient } from "better-auth/client"
import { adminClient, inferAdditionalFields, usernameClient } from "better-auth/client/plugins"
import type  { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient(),
        usernameClient(),
        inferAdditionalFields<typeof auth>()
    ]
})