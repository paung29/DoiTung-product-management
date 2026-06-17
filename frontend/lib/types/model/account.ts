import accounts from "@/mock/accounts.json";
export type Role = "admin" | "staff";

export type Account = {
  account_id: string;
  name: string;
  email: string;
  password: string;
  role_on_db: Role;
  phone_no: string;
  status: string;
};

export function getAccounts({ records }: { records: Account[] }): Account[] {
  return records;
}

export function getUserStatus({ records }: { records: Account[] }) {
  const all = getAccounts({ records: records });
  const totalUsers = all.length;
  const adminUsers = all.filter(
    (account) => account.role_on_db.toLocaleLowerCase() === "admin",
  ).length;
  const staffUsers = all.filter(
    (account) => account.role_on_db.toLocaleLowerCase() === "staff",
  ).length;

  return {
    totalUsers,
    adminUsers,
    staffUsers,
  };
}
