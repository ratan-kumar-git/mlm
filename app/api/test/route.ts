import { auth } from "@/lib/auth";
import { generateSafeReferralCode } from "@/lib/referral";


export async function GET() {
  const businessId = await generateSafeReferralCode();

  const newUser = await auth.api.createUser({
    body: {
      name: "Test User",
      email: "test1@gmail.com",
      password: "securePassword123",
      role: "user",
      data: {
        referredById: null,
        referralCode: businessId,
      },
    },
  });

  return Response.json(newUser);
}
