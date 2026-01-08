import { betterAuth } from "better-auth";
import { admin, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.NEXTAUTH_URL || "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      referralCode: {
        type: "string",
        required: false,
      },
      referredById: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [
    admin(),
    username({
      minUsernameLength: 5,
      maxUsernameLength: 20,
      displayUsernameValidator: (displayUsername) => {
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
      },
    }),
  ],
});
