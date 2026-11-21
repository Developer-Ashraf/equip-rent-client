import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  "use server";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export const getToken = async () => {
  const session = await getSession();
  if (!session || !session.session?.token) {
    redirect("/login");
  }
  return session.session.token;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/login");
  }

  if (res.status === 403) {
    redirect("/unauthorized");
  }

  return res;
};

export const publicFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 },
  });
};
