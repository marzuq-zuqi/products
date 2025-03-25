import Link from "next/link";
import { Home, Box, User, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Home size={18} /> Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Box size={18} /> Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <User size={18} /> Profile
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
              <Settings size={18} /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;