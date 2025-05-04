import Sidebar from "../components/Sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage products and inventory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <AuthProvider>
          <Sidebar />
          <main className="flex-1 p-6"> 
            {children}
            <Toaster position="top-right" />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

