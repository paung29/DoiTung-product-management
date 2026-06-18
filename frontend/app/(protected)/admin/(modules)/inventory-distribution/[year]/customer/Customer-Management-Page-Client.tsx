import Customer from "@/components/custom/admin/inventory&distribution/customer";
import { CustomerHistoryData } from "@/components/custom/admin/inventory&distribution/customer-tabel";
import React from "react";

function CustomerHome({records} : {records : CustomerHistoryData[]}) {
  return <Customer records={records}/>
}

export default CustomerHome;
