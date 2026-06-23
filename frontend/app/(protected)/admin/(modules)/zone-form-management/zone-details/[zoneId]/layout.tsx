/* eslint-disable no-var */
"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { ZoneFormContextProvider } from "../../zone-form-context";

function FormsInZonePageLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ zoneId: string }>();
  const pathname = usePathname();

  const zoneId = params.zoneId;

  const links = [
    { href: "cluster", label: "Cluster" },
    { href: "flower", label: "Flower" },
    { href: "pollination", label: "Pollination" },
    { href: "pod", label: "Pod" },
    { href: "preharvest", label: "Preharvest" },
    { href: "harvest-grading", label: "Harvest & Grading" },
  ];

  return (
    <ZoneFormContextProvider>
      <div className="min-h-screen w-full px-20 py-10">
        <div className="bg-secondary mb-10 w-full rounded-lg p-8 drop-shadow-lg">
          <div className="flex gap-2">
            <div className="bg-primary-button flex size-[60px] items-center justify-center rounded-lg text-white">
              <MapPin className="size-8" />
            </div>

            <div className="text-primary flex flex-col justify-center gap-1">
              <h1 className="text-xl font-bold">Zone Name {zoneId}</h1>
              <p>Comprehensive production tracking and grading data</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {links.map((item) => {
            const href = `/admin/zone-form-management/zone-details/${zoneId}/${item.href}`;
            const active = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={`rounded-md border px-4 py-2 text-sm font-medium ${
                  active
                    ? "bg-primary-button text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </ZoneFormContextProvider>
  );
}

export default FormsInZonePageLayout;