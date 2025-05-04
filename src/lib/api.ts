const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  auth?: boolean; // whether to include credentials
};

type APIResponse<T = any> = {
  ok: boolean;
  status: number;
  data?: T;
};

async function request<T = any>(
  endpoint: string,
  { method = "GET", body, auth = true }: FetchOptions = {}
): Promise<APIResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: auth ? "include" : "same-origin",
    });

    const data = await res.json().catch(() => ({}));

    return {
      ok: res.ok,
      status: res.status,
      data
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      ok: false,
      status: 500,
      data: undefined,
    };
  }
}

// ---------- Auth ----------
export const login = (username: string, password: string) =>
  request("/auth/login", { method: "POST", body: { username, password } });

export const register = (email: string, password: string, username: string, role: string) =>
  request("/auth/register", { method: "POST", body: { email, password, username, role } });

export const logout = () => request("/auth/logout", { method: "POST" });

// ---------- Products ----------
export const fetchProducts = (
  page = 1,
  limit = 10,
  searchQuery = ""
) =>
  request(`/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`);

export const fetchProduct = (id: string) =>
  request(`/api/products/${id}`);

export const createProduct = (product: any) =>
  request("/api/products", { method: "POST", body: product });

export const updateProduct = (id: string, product: any) =>
  request(`/api/products/${id}`, { method: "PUT", body: product });

export const deleteProduct = (id: string) =>
  request(`/api/products/${id}`, { method: "DELETE" });
