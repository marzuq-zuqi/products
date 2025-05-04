"use client";

import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/lib/api";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts(page, limit, searchQuery);

        setProducts(data.data?.products || []);
        setTotalPages(data.data?.totalPages || 1)

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [page, searchQuery, limit]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Product List</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="p-4 text-sm">{product.name}</td>
                <td className="p-4 text-sm">${product.price}</td>
                <td className="p-4 text-sm">{product.quantity}</td>
                <td className="p-4 text-sm">
                  <Link href={`/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 mr-4 transition duration-200">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-6 py-3 ${page === 1 ? "bg-gray-300" : "bg-blue-600 text-white"} rounded-lg focus:outline-none transition duration-300`}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-6 py-3 ${page === totalPages ? "bg-gray-300" : "bg-blue-600 text-white"} rounded-lg focus:outline-none transition duration-300`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
