"use client";

import { Account } from "@/lib/types/model/account";
import { KeyRound } from "lucide-react";
import EditButton from "@/components/custom/common/edit-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditUserModal from "./edit-user-modal";
import ChangePasswordModal from "./change-password-modal";

interface UsersTableProps {
  users: Account[];
}

export default function UsersTable({
  users,
  

}: UsersTableProps) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isEditPassword, setIsEditPassword] = useState(false);
  
  const getRoleBadgeColor = (role: string) => {
    return role.toLocaleLowerCase() === "admin"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";
  };

  const getRoleLabel = (role: string) => {
    return role.toLocaleLowerCase() === "admin" ? "Admin" : "Staff";
  };

  const onEditUser = (user : Account) => {
    setSelectedAccount(user);
    setIsEditModalOpen(true);
  }

  const handleChangePassword = (user: Account) => {
      console.log("opening password modal", user);
      setSelectedAccount(user)
      setIsEditPassword(true);
      
    };
  console.log(users);

  return (
    <div className="border-primary-button mb-4 overflow-hidden rounded-2xl border">

      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
      />

      <ChangePasswordModal 
        isOpen={isEditPassword}
        onClose={() => {
          setIsEditPassword(false);
          setSelectedAccount(null);
        }}
        user={selectedAccount}
      />

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
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status ? "ACTIVE" : "INACTIVE"}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {/* Edit User Info */}
                  <EditButton onClick={() => onEditUser(user)} />

                  {/* Change Password */}
                  <button
                    onClick={() => {
                      console.log("password clicked");
                      handleChangePassword(user);
                    }}
                    className="text-primary-button hover:bg-primary-button/10 rounded-lg p-2 transition-colors"
                    title="Change Password"
                  >
                    <KeyRound size={18} />
                  </button>
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
