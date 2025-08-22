"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Transaction {
  id: string;
  type: "sent" | "received";
  name: string;
  phone: string;
  amount: number;
  createdAt: string;
}

interface TransactionHistoryProps {
  walletId: string;
  refreshSignal?: number;
}

export default function TransactionHistory({
  walletId,
  refreshSignal = 0,
}: TransactionHistoryProps) {
  const [history, setHistory] = useState<Transaction[]>([]);

  const fetchHistory = useCallback(async () => {
    if (!walletId) return;
    try {
      const res = await fetch(`/api/transactions?walletId=${walletId}`);
      const data: { success: boolean; history: Transaction[] } =
        await res.json();
      if (data.success) setHistory(data.history);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  }, [walletId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, refreshSignal]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Transaction History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-600 text-center py-6">No transactions yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {history.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                {tx.type === "sent" ? (
                  <ArrowUpCircle className="w-6 h-6 text-red-500" />
                ) : (
                  <ArrowDownCircle className="w-6 h-6 text-green-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {tx.type === "sent" ? "Sent to" : "Received from"} {tx.name}
                  </p>
                  <p className="text-xs text-gray-500">{tx.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-base font-semibold ${
                    tx.type === "sent" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tx.type === "sent" ? "- " : "+ "}₹{tx.amount}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
