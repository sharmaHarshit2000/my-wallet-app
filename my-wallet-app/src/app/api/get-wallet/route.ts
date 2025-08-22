import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface GetWalletRequest {
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { userId }: GetWalletRequest = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json({ wallet }, { status: 200 });
  } catch (error: unknown) {
    console.error("get-wallet error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
