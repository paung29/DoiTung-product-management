/* eslint-disable no-var */
"use client";
import { MapPin, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

function FormsInZonePageLayout({ children }: { children: React.ReactNode }) {
  var param = useParams();
  var zoneId = param.zoneId;
  const router = useRouter();
  return (
    <div className="min-h-screen w-full px-20 py-10">
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium shadow-sm"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

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
      {children}
    </div>
  );
}

export default FormsInZonePageLayout;
