"use client";
import { useState } from "react";
import UserToolbar from "@/components/custom/admin/toolBar";
import StatusCard from "@/components/custom/admin/statusCard";
import CreateUserModal, {
  CreateUserFormData,
} from "@/components/custom/admin/create-user-modal";
import UsersTable from "@/components/custom/admin/users-table";
import { Account, getUserStatus } from "@/lib/types/model/account";
import { Shield, UserCog, Users } from "lucide-react";
import { createUser } from "@/lib/server-actions/admin/create-user-client";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "@/lib/server-actions/admin/update-user-info-client";
import {
  UpdateUserInfoFormData,
  UpdateUserPasswordFormData,
} from "@/lib/types/model/type";
import ChangePasswordModal, {
  ChangePasswordFormData,
} from "@/components/custom/admin/change-password-modal";
import { updateUserPassword } from "@/lib/server-actions/admin/update-user-password-client";

function UserManage({ records }: { records: Account[] }) {
  const router = useRouter();

  const { totalUsers, adminUsers, staffUsers } = getUserStatus({
    records: records,
  });

  console.log(records);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Account | null>(null);
  const [editingPasswordUser, setEditingPasswordUser] =
    useState<Account | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);


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
          Showing {records.length} users
        </div>

        <UsersTable
          users={records}
        />
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        user={editingPasswordUser}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setEditingPasswordUser(null);
        }}
      />
    </div>
  );
}

export default UserManage;
