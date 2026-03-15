"use client";

import { Account } from "@/lib/types/model/account";
import { Edit, Trash2 } from "lucide-react";

interface UsersTableProps {
  users: Account[];
  onEdit?: (user: Account) => void;
  onDelete?: (userId: string) => void;
}

export default function UsersTable({
  users,
  onEdit = () => {},
  onDelete = () => {},
}: UsersTableProps) {
  const getRoleBadgeColor = (role: string) => {
    return role === "admin"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";
  };

  const getRoleLabel = (role: string) => {
    return role === "admin" ? "Admin" : "Staff";
  };

  return (
    <div
      className="overflow-x-auto rounded-lg border border-yellow-900/20 shadow-sm"
      style={{ backgroundColor: "#FAF3E0" }}
    >
      <table className="w-full">
        {/* Header */}
        <thead>
          <tr
            className="border-b border-yellow-900/10"
            style={{ backgroundColor: "#6B4423" }}
          >
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Status
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {users.map((user) => (
            <tr
              key={user.account_id}
              className="border-b border-yellow-900/10 transition-colors hover:bg-yellow-900/10"
              style={{ backgroundColor: "#FAF3E0" }}
            >
              {/* Name */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {user.name}
              </td>

              {/* Email */}
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>

              {/* Role */}
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(
                    user.role_on_db,
                  )}`}
                >
                  {getRoleLabel(user.role_on_db)}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-yellow-900/10 hover:text-yellow-900"
                    title="Edit user"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user.account_id)}
                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
                    title="Delete user"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <p className="text-sm text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}
