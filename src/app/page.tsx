import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to Products!</p>
      </main>
    </div>
  );
}
