"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Wallet,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

type User = {
  id: string;
  name: string;
};

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <Wallet className="w-7 h-7 text-indigo-600" />
        <span>My Wallet App</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            <span className="font-medium text-gray-800">Hi, {user.name}</span>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center gap-4 py-4">
          {user ? (
            <>
              <span className="font-medium text-gray-800">Hi, {user.name}</span>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
