"use server";

import { AvatarInitials } from "@/components/custom/common/avatar-initials";
import { getUserAccount } from "@/lib/server-actions/get-user-account-client";
import { AccountItem } from "@/lib/types/model/type";

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-amber-100 pb-3">
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {label}
      </p>
      <p className="text-primary mt-1 text-base">{value}</p>
    </div>
  );
}

export default async function Page() {
  const account: AccountItem = await getUserAccount();

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="border-primary mx-auto max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <AvatarInitials name={account.name} />
          <div>
            <h1 className="text-primary text-xl font-bold">{account.name}</h1>
            <p className="text-sm text-gray-500">{account.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <ProfileField label="Email" value={account.email} />
          <ProfileField label="Phone Number" value={account.phone_no || "N/A"} />
          <ProfileField
            label="Status"
            value={account.active_status ? "Active" : "Inactive"}
          />
        </div>
      </div>
    </div>
  );
}
