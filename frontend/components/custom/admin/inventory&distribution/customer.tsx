import React from "react";
import AddCustomerButton from "./add-customer-button";
import SelectYearCard from "./select-year-card";
import CustomerTable from "./customer-tabel";

function Customer() {
  return (
    <div className="space-y-6">
      <AddCustomerButton />
      <CustomerTable />
    </div>
  );
}

export default Customer;
