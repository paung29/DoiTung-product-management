import InventorySaleForm from "@/components/custom/admin/inventory&distribution/inventory-sale-form";
import { Option } from "@/lib/types/model/option";
import { YearApiResponse } from "@/lib/types/model/type";
import { useInventory } from "../../inventory-context";

export default function DistributionPage({years, plantationAreaOptions, customers} : {years : YearApiResponse, plantationAreaOptions : Option[] , customers : Option[]}) {


  return (
    <div className="px-10 py-6">
      <InventorySaleForm years={years} plantationAreaOptions={plantationAreaOptions} customers={customers}/>
    </div>
  );
}