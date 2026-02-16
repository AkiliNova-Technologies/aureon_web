"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, UserPlus, Mail, Shield, Ban, ChevronDown } from "lucide-react";
import { adminUsers } from "@/lib/admin-data";
import { formatPrice, cn } from "@/lib/utils";

const roleColors: Record<string, string> = {
  admin: "bg-gold/10 text-gold",
  vip: "bg-purple-500/10 text-purple-600",
  customer: "bg-ivory-dark text-stone",
};

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-warm-gray/20 text-stone",
  suspended: "bg-error/10 text-error",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const filtered = adminUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedUsers((prev) =>
      prev.length === filtered.length ? [] : filtered.map((u) => u.id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-2xl">User Management</h1>
          <p className="text-stone text-sm mt-1">{adminUsers.length} registered users</p>
        </div>
        <button className="btn-primary px-5 py-2.5 text-xs tracking-[0.08em] uppercase flex items-center gap-2">
          <UserPlus size={14} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="!pl-10 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", "customer", "vip", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={cn(
                "px-4 py-2 text-xs tracking-wider uppercase rounded-md border transition-all",
                roleFilter === role
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-warm-gray/30 text-stone hover:border-charcoal hover:text-charcoal"
              )}
            >
              {role === "all" ? "All" : role}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs tracking-wider uppercase text-stone border-b border-warm-gray/20 bg-ivory-dark/50">
                <th className="px-4 py-4 font-medium">User</th>
                <th className="px-4 py-4 font-medium">Role</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium text-center">Orders</th>
                <th className="px-4 py-4 font-medium text-center">Total Spent</th>
                <th className="px-4 py-4 font-medium text-center">Joined</th>
                <th className="px-4 py-4 font-medium text-center">Last Active</th>
                <th className="px-4 py-4 font-medium text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-warm-gray/10 last:border-0 hover:bg-ivory-dark/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-ivory-dark flex items-center justify-center text-xs font-medium text-stone flex-shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-stone">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium", roleColors[user.role])}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium", statusColors[user.status])}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">{user.orders}</td>
                  <td className="px-4 py-4 text-sm text-center">{formatPrice(user.totalSpent)}</td>
                  <td className="px-4 py-4 text-xs text-stone text-center">{user.joined}</td>
                  <td className="px-4 py-4 text-xs text-stone text-center">{user.lastActive}</td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                        className="text-stone hover:text-charcoal transition-colors p-1"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {actionMenu === user.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-warm-gray/30 rounded-lg shadow-lg py-2 min-w-[150px] z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-stone hover:text-charcoal hover:bg-ivory-dark flex items-center gap-2 transition-colors">
                            <Mail size={12} /> Email User
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-stone hover:text-charcoal hover:bg-ivory-dark flex items-center gap-2 transition-colors">
                            <Shield size={12} /> Change Role
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/5 flex items-center gap-2 transition-colors">
                            <Ban size={12} /> Suspend
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-stone text-sm">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
