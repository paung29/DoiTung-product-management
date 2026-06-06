"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, FileText, MapPin } from "lucide-react";
import { ZoneFormProvider } from "./zone-form-context";

const zoneAndFormTabs = [
  {
    href: "/admin/zone-form-management/year",
    label: "Year Management",
    icon: Calendar,
  },
  {
    href: "/admin/zone-form-management/zone",
    label: "Zone Management",
    icon: MapPin,
  },
  {
    href: "/admin/zone-form-management/form",
    label: "Form Management",
    icon: FileText,
  },
];

export default function ZoneAndFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ZoneFormProvider>
        <div className="px-10 py-6">
            <div className="flex gap-3 border-b">
                {zoneAndFormTabs.map((tab) => {
                const Icon = tab.icon;
                const active = pathname === tab.href;

                return (
                    <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                        active
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500"
                    }`}
                    >
                    <Icon size={16} />
                    {tab.label}
                    </Link>
                );
                })}
            </div>

            <div className="py-6">{children}</div>
            </div>
    </ZoneFormProvider>
    
  );
}