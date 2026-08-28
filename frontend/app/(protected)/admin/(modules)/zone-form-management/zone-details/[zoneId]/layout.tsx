"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ZoneFormContextProvider } from "../../zone-form-context";

function FormsInZonePageLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ zoneId: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const zoneId = params.zoneId;

  // The year and zone name the user came from (passed via "View Report").
  // Preserved across the detail tabs so the header shows the real zone name
  // and Back always returns to the correct Zone & Form Management view.
  const year = searchParams.get("year");
  const name = searchParams.get("name");
  const zoneName = name || `Zone ${zoneId}`;

  const tabQuery = new URLSearchParams();
  if (year) tabQuery.set("year", year);
  if (name) tabQuery.set("name", name);
  const tabQueryString = tabQuery.toString() ? `?${tabQuery.toString()}` : "";

  const backHref = year
    ? `/admin/zone-form-management/${year}/zone`
    : "/admin/zone-form-management";

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
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <div className="bg-primary-button flex size-15 items-center justify-center rounded-lg text-white">
                <MapPin className="size-8" />
              </div>

              <div className="text-primary flex flex-col justify-center gap-1">
                <h1 className="text-xl font-bold">{zoneName}</h1>
                <p>Comprehensive production tracking and grading data</p>
              </div>
            </div>

            <Link
              href={backHref}
              className="bg-primary-button rounded-lg px-4 py-2 text-sm text-white hover:border-2 hover:border-amber-100"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="border-primary mb-6 flex rounded-xl border bg-amber-50 p-1">
          {links.map((item) => {
            const href = `/admin/zone-form-management/zone-details/${zoneId}/${item.href}`;
            const active = pathname === href;

            return (
              <Link
                key={item.href}
                href={`${href}${tabQueryString}`}
                className={`flex-1 rounded-lg px-6 py-3 text-center font-semibold transition-all ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-primary hover:bg-amber-100"
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
