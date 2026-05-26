"use client";
import { useState } from "react";
import UserToolbar from "@/components/custom/admin/toolBar";
import accounts from "@/mock/accounts.json";
import StatusCard from "@/components/custom/admin/statusCard";
import CreateUserModal from "@/components/custom/admin/create-user-modal";
import UsersTable from "@/components/custom/admin/users-table";
import { Account, getUserStatus } from "@/lib/types/model/account";
import { Shield, UserCog, Users } from "lucide-react";
import { CreateUserFormData } from "@/lib/types/model/type";
import { createUser } from "@/lib/server-actions/admin/create-user-client";

function UserManage() {
  const { totalUsers, adminUsers, staffUsers } = getUserStatus();
  const users = accounts as Account[];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Account | null>(null);

  const filtered = users;

  const handleCreateUser = async (data: CreateUserFormData) => {

    console.log("Creating user:", data);
    const response = await createUser(data)
    
    console.log(response)
  };

  const handleEditUser = (user: Account) => {
    console.log("Editing user:", user);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 justify-items-center gap-4 py-10 md:grid-cols-3">
        <StatusCard
          icon={<Users size={36} />}
          value={totalUsers}
          label="Total Users"
        />
        <StatusCard
          icon={<UserCog size={36} />}
          value={staffUsers}
          label="Total Staff"
        />
        <StatusCard
          icon={<Shield size={36} />}
          value={adminUsers}
          label="Admins"
        />
      </div>

      <div className="space-y-6 px-10">
        <UserToolbar
          onSearch={() => {}}
          onCreate={() => setIsModalOpen(true)}
        />

        <div className="text-sm text-yellow-900/70">
          Showing {filtered.length} users
        </div>

        <UsersTable users={filtered} onEdit={handleEditUser} />
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleCreateUser}
        editingUser={editingUser}
      />
    </div>
  );
}

export default UserManage;
