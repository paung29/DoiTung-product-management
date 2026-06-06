"use client";
import { useState } from "react";
import UserToolbar from "@/components/custom/admin/toolBar";
import accounts from "@/mock/accounts.json";
import StatusCard from "@/components/custom/admin/statusCard";
import CreateUserModal, { CreateUserFormData } from "@/components/custom/admin/create-user-modal";
import UsersTable from "@/components/custom/admin/users-table";
import { Account, getUserStatus } from "@/lib/types/model/account";
import { Shield, UserCog, Users } from "lucide-react";
import { createUser } from "@/lib/server-actions/admin/create-user-client";
import { useParams, useRouter } from "next/navigation";
import { updateUserInfo } from "@/lib/server-actions/admin/update-user-info-client";
import { UpdateUserInfoFormData } from "@/lib/types/model/type";

function UserManage({records} : {records : Account[]}) {


    const router = useRouter();

    const {totalUsers, adminUsers, staffUsers } = getUserStatus({records : records});

    console.log(records)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Account | null>(null);

    const handleCreateUser = async (data: CreateUserFormData) => {

        console.log("Creating user:", data);
        const response = await createUser(data)
        
        console.log(response)

        router.replace(`/admin/user-management`)
    };

    const handleEditUser = async (user: Account) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSubmitUser = async (data: CreateUserFormData) => {
        if (editingUser) {
            const reformData: UpdateUserInfoFormData = {
            user_id: Number(editingUser.account_id),
            phone_no: String(data.phone_no),
            name: data.name,
            role: data.role,
            active_status: Boolean(data.active_status),
            };
            console.log("Updating user:", reformData);
            const response = await updateUserInfo(reformData);
            console.log(response)
        } else {
            console.log("Creating user:", data);
            await createUser(data);
            const response = await createUser(data)
            console.log(response)
        }

        setIsModalOpen(false);
        setEditingUser(null);
        router.replace(`/admin/user-management`);
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
            Showing {records.length} users
            </div>

            <UsersTable users={records} onEdit={handleEditUser} />
        </div>

        <CreateUserModal
            isOpen={isModalOpen}
            onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
            }}
            onSubmit={handleSubmitUser}
            editingUser={editingUser}
        />
        </div>
    );
    }

export default UserManage;
