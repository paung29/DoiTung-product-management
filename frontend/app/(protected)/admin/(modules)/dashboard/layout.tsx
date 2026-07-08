"use client";

import BackButton from "@/components/custom/common/back-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <BackButton fallbackHref="/admin" />
      </div>

      {children}
    </div>
  );
}
