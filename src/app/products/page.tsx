import ProductList from "@/components/ProductList";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/new" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <ProductList />
    </div>
  );
}
