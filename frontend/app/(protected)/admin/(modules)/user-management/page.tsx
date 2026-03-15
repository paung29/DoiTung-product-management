"use client";
import { useState } from "react";
import UserToolbar from "@/components/custom/admin/toolBar";
import accounts from "@/mock/accounts.json";
import StatusCard from "@/components/custom/admin/statusCard";
import CreateUserModal from "@/components/custom/admin/create-user-modal";
import UsersTable from "@/components/custom/admin/users-table";
import DeleteConfirmationDialog from "@/components/custom/admin/delete-confirmation-dialog";
import { Account, getUserStatus } from "@/lib/types/model/account";
import { Shield, UserCog, Users } from "lucide-react";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  phone: string;
  department: string;
}

function UserManage() {
  const { totalUsers, adminUsers, staffUsers } = getUserStatus();
  const users = accounts as Account[];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Account | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId: string | null;
    userName: string;
  }>({
    isOpen: false,
    userId: null,
    userName: "",
  });
  const filtered = users;

  const handleCreateUser = (data: CreateUserFormData) => {
    console.log("Creating user:", data);
    // TODO: API call
  };

  const handleEditUser = (user: Account) => {
    console.log("Editing user:", user);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.account_id === userId);
    if (user) {
      setDeleteConfirmation({
        isOpen: true,
        userId,
        userName: user.name,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.userId) {
      console.log("Deleting user:", deleteConfirmation.userId);
      // TODO:  API call
    }
    setDeleteConfirmation({ isOpen: false, userId: null, userName: "" });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, userId: null, userName: "" });
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

        <UsersTable
          users={filtered}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
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

      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        userName={deleteConfirmation.userName}
      />
    </div>
  );
}

export default UserManage;
