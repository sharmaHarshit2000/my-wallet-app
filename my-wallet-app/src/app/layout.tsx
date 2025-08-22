import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export const metadata = {
  title: "My Wallet App",
  description: "Wallet Transfer App",
  icons: {
    icon: "/favicon.ico",
  },
};


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
