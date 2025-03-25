const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 bg-gray-200 rounded-md">Logout</button>
      </div>
    </div>
  );
};

export default Header;