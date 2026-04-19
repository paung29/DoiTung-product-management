"use client";
import { MapPin } from "lucide-react";
import { useParams } from "next/navigation";

function FormsInZonePageLayout({ children }: { children: React.ReactNode }) {
  var param = useParams();
  var zoneId = param.zoneId;
  return (
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
      {children}
    </div>
  );
}

export default FormsInZonePageLayout;
