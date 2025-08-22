import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { senderPhone, receiverPhone, amount } = await req.json();

  if (!senderPhone || !receiverPhone || !amount)
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });

  const amt = parseFloat(amount);
  if (amt <= 0) return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 });

  try {
    const sender = await prisma.user.findUnique({ where: { phone: senderPhone }, include: { wallet: true } });
    const receiver = await prisma.user.findUnique({ where: { phone: receiverPhone }, include: { wallet: true } });

    if (!sender || !receiver) return NextResponse.json({ error: "Invalid sender or receiver" }, { status: 404 });
    if (!sender.wallet || !receiver.wallet)
      return NextResponse.json({ error: "Sender or receiver does not have a wallet" }, { status: 400 });
    if (sender.wallet.balance < amt) return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });

    // Atomic transaction
    const result = await prisma.$transaction(async (prisma) => {
      const debit = await prisma.wallet.update({
        where: { id: sender.wallet!.id },
        data: { balance: { decrement: amt } },
      });

      const credit = await prisma.wallet.update({
        where: { id: receiver.wallet!.id },
        data: { balance: { increment: amt } },
      });

      const payment = await prisma.payment.create({
        data: {
          amount: amt,
          sender: { connect: { id: sender.wallet!.id } },
          receiver: { connect: { id: receiver.wallet!.id } },
        },
      });

      return { debit, credit, payment };
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
