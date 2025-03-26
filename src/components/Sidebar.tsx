"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">My Products</h2>

      <nav className="flex-grow">
        <ul className="space-y-3">
          <li>
            <Link href="/" className={`block p-2 rounded ${pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/products" className={`block p-2 rounded ${pathname === "/products" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              Products
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition-transform transform active:scale-95"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </aside>
  );
}
