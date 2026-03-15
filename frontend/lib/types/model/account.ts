import accounts from "@/mock/accounts.json";
export type Role = "admin" | "staff";

export type Account = {
  account_id: string;
  name: string;
  email: string;
  password: string;
  role_on_db: Role;
};

export function getAccounts(): Account[] {
  return accounts as Account[];
}

export function getUserStatus() {
  const all = getAccounts();
  const totalUsers = all.length;
  const adminUsers = all.filter(
    (account) => account.role_on_db === "admin",
  ).length;
  const staffUsers = all.filter(
    (account) => account.role_on_db === "staff",
  ).length;

  return {
    totalUsers,
    adminUsers,
    staffUsers,
  };
}
