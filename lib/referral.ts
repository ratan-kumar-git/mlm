import prisma from "./prisma";


export async function generateSafeReferralCode(): Promise<string> {
  const result = await prisma.$queryRaw<[{ nextval: bigint }]>`
    SELECT nextval('user_referral_seq');
  `;

  const nextId = result[0].nextval;
  return `U${nextId}`; 
}