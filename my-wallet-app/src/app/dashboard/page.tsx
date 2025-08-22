"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TransferForm from "@/components/TransferForm";
import TransactionHistory from "@/components/TransactionHistory";
import Footer from "@/components/Footer";
import { Wallet } from "lucide-react";

type Wallet = {
  id: string;
  balance: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  wallet: Wallet;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser) as User;
    try {
      const res = await fetch(`/api/auth/me?phone=${parsedUser.phone}`);
      const data = await res.json();
      if (data.success) {
        setUser(data.user as User);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    const interval = setInterval(fetchUser, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!user)
    return (
      <p className="text-center mt-20 text-gray-700 text-lg font-medium">
        Loading...
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-4 mt-8 flex flex-col gap-8">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-3xl font-bold mt-2">
              ₹ {user.wallet?.balance ?? 0}
            </p>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>

        {/* Transfer Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Transfer Money
          </h3>
          <TransferForm
            user={user}
            onTransferSuccess={async () => {
              await fetchUser();
              handleRefresh();
            }}
          />
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Transactions
          </h3>
          <TransactionHistory
            walletId={user.wallet.id}
            refreshSignal={refresh}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
