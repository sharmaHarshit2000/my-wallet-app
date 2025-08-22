import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const walletId = req.nextUrl.searchParams.get("walletId");
    if (!walletId) {
      return NextResponse.json({ error: "walletId required" }, { status: 400 });
    }

    // Fetch payments for this wallet
    const payments = await prisma.payment.findMany({
      where: {
        OR: [{ senderId: walletId }, { receiverId: walletId }],
      },
      include: {
        sender: { include: { user: true } },
        receiver: { include: { user: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    
    const history = payments.map((p) => ({
      id: p.id,
      amount: p.amount,
      type: p.senderId === walletId ? "sent" : "received",
      name: p.senderId === walletId ? p.receiver.user.name : p.sender.user.name,
      phone:
        p.senderId === walletId ? p.receiver.user.phone : p.sender.user.phone,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
