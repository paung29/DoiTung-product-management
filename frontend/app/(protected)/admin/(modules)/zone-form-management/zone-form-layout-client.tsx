import { YearApiResponse } from "@/lib/types/model/type";
import { ZoneFormContextProvider } from "./zone-form-context";
import { ZoneFormLayoutContent } from "./zone-form-layout-content";

export default function ZoneFormLayoutClient({
  children,
  yearRecords,
}: {
  children: React.ReactNode;
  yearRecords: YearApiResponse;
}) {
  return (
    <ZoneFormContextProvider>
      <ZoneFormLayoutContent yearRecords={yearRecords}>
        {children}
      </ZoneFormLayoutContent>
    </ZoneFormContextProvider>
  );
}