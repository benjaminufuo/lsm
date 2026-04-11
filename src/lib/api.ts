const BASE_URL = "https://talentflow-backend-vo89.onrender.com";

type ApiOptions = RequestInit & {
  token?: string | null;
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const token = options.token ?? localStorage.getItem("token");

  const headers: Record<string, string> = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const err = data as { message?: string; error?: string } | null;
    throw new Error(
      err?.message || err?.error || `Request failed with status ${response.status}`
    );
  }

  return data as T;
}