const API_URL = "http://localhost:8080/api/products";

export async function fetchProducts(page: number, limit: number, searchQuery: string) {
  const res = await fetch(API_URL);
  return res.json();
}

// export async function fetchProducts(page = 1, limit = 10, searchQuery = "") {
//   const res = await fetch(
//     `/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return await res.json();
// }

export async function fetchProduct(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createProduct(product: any) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id: string, product: any) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
