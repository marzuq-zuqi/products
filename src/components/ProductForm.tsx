"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct, fetchProduct } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProductForm({ productId }: { productId?: string }) {
  const [product, setProduct] = useState<{ name: string; price: string; quantity: string, description: string }>({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (productId) {
      async function loadProduct() {
        try {
          setLoading(true);
          const data = await fetchProduct(String(productId));
          if (data) setProduct(data.data);
          setProduct(data.data);
        } catch (err) { 
          console.error("Product fetch error:", err);
          setError("Failed to load product details.");
        } finally {
          setLoading(false);
        }
      }
      loadProduct();
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!product.name || !product.price || !product.quantity) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      if (productId) {
        await updateProduct(productId, product);
      } else {
        await createProduct(product);
      }
      router.push("/products");
    } catch (err) {
      console.error("Product update error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-center">{productId ? "Edit Product" : "Add Product"}</h2>

    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Name:</label>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Price:</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Quantity:</label>
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Description:</label>
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className={`bg-blue-600 text-white px-6 py-3 w-full rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading}
    >
      {loading ? "Processing..." : productId ? "Update Product" : "Add Product"}
    </button>
  </form>
  );
}