import { CreateOrEditZoneButton } from "@/components/custom/admin/zone&form/CreateNewZoneButton";
import ZoneTotalCard from "@/components/custom/admin/zone&form/ZoneTotalCard";
import { Flower, MapPin } from "lucide-react";
import React from "react";

function ZoneManagementPage() {
  return (
    <>
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-row items-end">
          <div className="flex flex-1 gap-8">
            <ZoneTotalCard title="Total Zones" total={10} icon={MapPin} />
            <ZoneTotalCard title="Total Plants" total={10} icon={Flower} />
          </div>
          <CreateOrEditZoneButton />
        </div>
        <div className="">Table</div>
      </div>
    </>
  );
}

export default ZoneManagementPage;
