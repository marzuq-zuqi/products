import ProductForm from "@/components/ProductForm";

type Props = {
  params:  Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id: productId } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm productId={productId} />
    </div>
  );
}
