import ProductForm from "@/components/ProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm productId={params.id} />
    </div>
  );
}
