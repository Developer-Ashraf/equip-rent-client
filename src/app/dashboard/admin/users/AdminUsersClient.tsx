"use client";

import { useState, useEffect } from "react";
import { User, Shield, CheckCircle, Mail, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AdminUsersClientProps {
  initialUsers: any[];
}

export default function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setUsers(initialUsers);
    } else {
      const fetchUsers = async () => {
        try {
          const sessionRes = await (authClient as any).getSession();
          const token = sessionRes?.data?.session?.token;
          const liveUrl =
            process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost")
              ? process.env.NEXT_PUBLIC_API_URL
              : "https://equip-rent-server-sepia.vercel.app";
          const res = await fetch(`${liveUrl}/api/admin/users`, {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : (data.users || data.items || []);
            if (list.length > 0) setUsers(list);
          }
        } catch {}
      };
      fetchUsers();
    }
  }, [initialUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);

    try {
      const sessionRes = await (authClient as any).getSession();
      const token = sessionRes?.data?.session?.token;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://equip-rent-server-sepia.vercel.app";
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update role");
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      toast.success(`User role updated to ${newRole}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong updating role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
              <th className="py-4 px-6">User Account</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Registered On</th>
              <th className="py-4 px-6">Current Role</th>
              <th className="py-4 px-6 text-right">Change Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {users.map((user) => {
              const uId = user._id || user.id;
              return (
                <tr key={uId} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 text-xs">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        {user.name || "Unnamed"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-semibold">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Active Member"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        user.role === "admin"
                          ? "bg-rose-100 text-rose-700"
                          : user.role === "owner"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role || "customer"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <select
                      disabled={updatingId === uId}
                      value={user.role || "customer"}
                      onChange={(e) => handleRoleChange(uId, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
