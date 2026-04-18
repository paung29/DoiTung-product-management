import { CreateOrEditZoneButton } from "@/components/custom/admin/zone&form/zone/create-new-zone-button";
import {
  ZoneTable,
  ZoneTableDataType,
} from "@/components/custom/admin/zone&form/zone/zone-table";
import ZoneTotalCard from "@/components/custom/admin/zone&form/zone-total-card";

import { Flower, MapPin } from "lucide-react";

function ZoneManagementTab({ selectedYear }: { selectedYear?: string }) {
  const zoneTableData: ZoneTableDataType[] = [
    {
      zone_name: "Zone 1",
      total_plants: 10,
    },
    {
      zone_name: "Zone 2",
      total_plants: 20,
    },
    {
      zone_name: "Zone 3",
      total_plants: 30,
    },
  ];
  return selectedYear ? (
    <>
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-row items-end">
          <div className="flex flex-1 gap-8">
            <ZoneTotalCard title="Total Zones" total={10} icon={MapPin} />
            <ZoneTotalCard title="Total Plants" total={10} icon={Flower} />
          </div>
          <CreateOrEditZoneButton />
        </div>
        {/* Table */}
        <ZoneTable zoneTableData={zoneTableData} />
      </div>
    </>
  ) : (
    <div>
      <p className="text-center text-lg font-medium text-gray-500">
        Please select a year to manage zones.
      </p>
    </div>
  );
}

export default ZoneManagementTab;
