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
          if (data) setProduct(data);
          setProduct(data);
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">{productId ? "Edit Product" : "Add Product"}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="block">Name:</label>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <label className="block">Price:</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <label className="block">Quantity:</label>
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      
      <label className="block">Description:</label>
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />


      <button
        type="submit"
        className={`bg-green-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Processing..." : productId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}