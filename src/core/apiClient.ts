type Opts = {
  baseUrl: string;
  getToken?: () => Promise<string | null> | string | null;
};

export const createApiClient = ({ baseUrl, getToken }: Opts) => {
  const request = async <T>(
    path: string,
    init?: RequestInit & { searchParams?: Record<string, any> }
  ): Promise<T> => {
    const token = typeof getToken === "function" ? await getToken() : null;
    const url = new URL(path, baseUrl);
    Object.entries(init?.searchParams || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });

    const res = await fetch(url.toString(), {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {})
      }
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, data };
    return data as T;
  };

  return {
    get: <T>(p: string, i?: any) => request<T>(p, { ...i, method: "GET" }),
    post: <T>(p: string, b?: unknown, i?: any) =>
      request<T>(p, { ...i, method: "POST", body: JSON.stringify(b) }),
    put: <T>(p: string, b?: unknown, i?: any) =>
      request<T>(p, { ...i, method: "PUT", body: JSON.stringify(b) }),
    patch: <T>(p: string, b?: unknown, i?: any) =>
      request<T>(p, { ...i, method: "PATCH", body: JSON.stringify(b) }),
    del: <T>(p: string, i?: any) => request<T>(p, { ...i, method: "DELETE" })
  };
};
