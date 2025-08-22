"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-600">
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-800">My Wallet App</span>.
          All rights reserved.
        </p>

        <div className="flex gap-6 mt-3 sm:mt-0 text-sm">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
