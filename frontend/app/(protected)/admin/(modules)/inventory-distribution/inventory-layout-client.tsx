import { YearApiResponse } from "@/lib/types/model/type";
import { InventoryContextProvider } from "./inventory-context";
import { InventoryLayoutContent } from "./inventory-layout-content";

export default function InventoryLayoutClient({
  children,
  yearRecords,
}: {
  children: React.ReactNode;
  yearRecords: YearApiResponse;
}) {
  return (
    <InventoryContextProvider>
      <InventoryLayoutContent yearRecords={yearRecords}>
        {children}
      </InventoryLayoutContent>
    </InventoryContextProvider>
  );
}