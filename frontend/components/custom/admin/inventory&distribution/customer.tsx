import React from "react";
import AddCustomerButton from "./add-customer-button";
import SelectYearCard from "./select-year-card";
import CustomerTable, { CustomerHistoryData } from "./customer-tabel";

function Customer({records} : {records : CustomerHistoryData[]}) {
  return (
    <div className="space-y-6">
      <AddCustomerButton />
      <CustomerTable data={records}/>
    </div>
  );
}

export default Customer;
