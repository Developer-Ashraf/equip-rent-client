import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl;
  }
  return "https://equip-rent-server-sepia.vercel.app";
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

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

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
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
};
