"use client";

import { Account } from "@/lib/types/model/account";
import { Edit } from "lucide-react";
import CustomButton from "./../common/custom-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UsersTableProps {
  users: Account[];
  onEdit?: (user: Account) => void;
}

export default function UsersTable({
  users,
  onEdit = () => {},
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
    <div className="border-primary-button overflow-hidden rounded-2xl border">
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={user.account_id}
            >
              {/* Name */}
              <TableCell className="font-medium">{user.name}</TableCell>

              {/* Email */}
              <TableCell>{user.email}</TableCell>

              {/* Role */}
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(
                    user.role_on_db,
                  )}`}
                >
                  {getRoleLabel(user.role_on_db)}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <CustomButton
                    label=""
                    icon={Edit}
                    onClick={() => onEdit(user)}
                    className="rounded-lg p-2 text-white transition-colors hover:bg-yellow-900/10 hover:text-yellow-900"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <p className="text-sm text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}
