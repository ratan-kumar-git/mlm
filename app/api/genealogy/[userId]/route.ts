import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context : { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  const rootId = userId;
  const rawData = await prisma.userClosure.findMany({
    where: { ancestorId: rootId },
    include: {
      descendant: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
          referralCode: true,
          referredById: true,
        },
      },
    },
    orderBy: { depth: "asc" },
  });

  const map = new Map();
  let rootNode = null;

  rawData.forEach((entry) => {
    const user = { ...entry.descendant, children: [] };
    map.set(user.id, user);

    if (user.id === rootId) {
      rootNode = user;
    }
  });

  rawData.forEach((entry) => {
    const user = map.get(entry.descendantId);
    if (user.id !== rootId && user.referredById) {
      const parent = map.get(user.referredById);
      if (parent) {
        parent.children.push(user);
      }
    }
  });

  return NextResponse.json(rootNode);
}
