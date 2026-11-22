import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getApiUrl } from "@/lib/api-config";

export { getApiUrl };

export const getSession = async () => {
  "use server";
  try {
    const h = await headers();
    const session = await auth.api.getSession({
      headers: h,
    });
    return session;
  } catch (error) {
    return null;
  }
};

export const getToken = async () => {
  try {
    const session = await getSession();
    return session?.session?.token || null;
  } catch (error) {
    return null;
  }
};

const API_BASE = getApiUrl();

export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const base = getApiUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    cache: "no-store",
  });
};

export const publicFetch = async (endpoint: string, options: RequestInit = {}) => {
  const base = getApiUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
};
