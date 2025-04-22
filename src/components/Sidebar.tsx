"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth(); 

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">My Products</h2>

      <nav className="flex-grow">
        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className={`block p-2 rounded ${
                pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={`block p-2 rounded ${
                pathname === "/products" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>

      {!loading && user ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition-transform transform active:scale-95"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <div className="space-y-2">
          <Link
            href="/login"
            className="block text-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block text-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
          >
            Register
          </Link>
        </div>
      )}
    </aside>
  );
}
