"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

type User = {
  name: string;
  phone: string;
  wallet?: {
    id: string;
    balance: number;
  } | null;
};

type TransferFormProps = {
  user: User;
  onTransferSuccess?: () => void;
};

export default function TransferForm({
  user,
  onTransferSuccess,
}: TransferFormProps) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const amt = Number(amount);
  const isInvalidAmount =
    isNaN(amt) || amt <= 0 || (user.wallet ? amt > user.wallet.balance : true);

  const handleTransfer = async () => {
    if (!receiver || !amount) return toast.error("All fields are required");
    if (!/^\d{10}$/.test(receiver))
      return toast.error("Enter a valid 10-digit phone number");

    if (isInvalidAmount) {
      return toast.error(
        amt <= 0
          ? "Enter an amount greater than 0"
          : "Insufficient balance"
      );
    }

    setLoading(true);

    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderPhone: user.phone,
          receiverPhone: receiver,
          amount: amt,
        }),
      });

      const data = await res.json();

      if (data.error) return toast.error(data.error);

      toast.success("Transfer successful!");
      setReceiver("");
      setAmount("");

      if (onTransferSuccess) onTransferSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full">
      <h2 className="text-xl font-semibold text-black mb-4">Send Money</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Receiver Input */}
        <div className="flex-1">
          <input
            type="tel"
            placeholder="Receiver Phone (10 digits)"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {receiver && !/^\d{10}$/.test(receiver) && (
            <p className="text-sm text-red-600 mt-1">
              Enter a valid 10-digit phone number
            </p>
          )}
        </div>

        {/* Amount Input */}
        <div className="flex-1">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            min={1}
            onChange={(e) => {
              const val = e.target.value;
              if (Number(val) < 0) setAmount("0");
              else setAmount(val);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {/* Real-time warnings */}
          {amt <= 0 && amount !== "" && (
            <p className="text-sm text-red-600 mt-1">
              Amount must be greater than 0
            </p>
          )}
          {user.wallet && amt > user.wallet.balance && (
            <p className="text-sm text-red-600 mt-1">
              Insufficient balance. Available: ₹{user.wallet.balance}
            </p>
          )}
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleTransfer}
        disabled={loading}
        className={`mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4" /> Send
          </>
        )}
      </button>
    </div>
  );
}
