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

  // useEffect(() => {
  //   async function loadProducts() {
  //     const data = await fetchProducts();
  //     setProducts(data);
  //   }
  //   loadProducts();
  // }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts(page, limit, searchQuery);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }
    loadProducts();
  }, [page, searchQuery]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">
                  <Link href={`/products/edit/${product.id}`} className="text-blue-500 mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 ${page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-white p-4 rounded shadow">
  //     <table className="w-full border-collapse">
  //       <thead>
  //         <tr className="border-b">
  //           <th className="text-left p-2">Name</th>
  //           <th className="text-left p-2">Price</th>
  //           <th className="text-left p-2">Quantity</th>
  //           <th className="text-left p-2">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {products.map((product) => (
  //           <tr key={product.id} className="border-b">
  //             <td className="p-2">{product.name}</td>
  //             <td className="p-2">${product.price}</td>
  //             <td className="p-2">{product.quantity}</td>
  //             <td className="p-2">
  //               <Link href={`/products/edit/${product.id}`} className="text-blue-500 mr-2">Edit</Link>
  //               <button onClick={() => handleDelete(product.id)} className="text-red-500">
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
