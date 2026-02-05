"use client";
import React, { useState } from "react";
import FormCard from "./form-card";
import StaffFormTitle from "./staff-form-title";
import StaffSelectionForm, { Option } from "./staff-selection-form";

function ClusterRecordingForm() {
  const options: Option[] = [
    {
      value: "Kit",
      label: "Kit",
    },
    {
      value: "Kat",
      label: "Kat",
    },
    {
      value: "Kot",
      label: "Kot",
    },
    {
      value: "Ket",
      label: "Ket",
    },
  ];

  const [location, setLocation] = useState("");

  return (
    <div>
      <FormCard>
        <StaffFormTitle isRequired={true} title={"Location"} />
        <StaffSelectionForm
          options={options}
          value={location}
          onChange={setLocation}
          placeholder={"Select Location"}
        />
      </FormCard>
    </div>
  );
}

export default ClusterRecordingForm;
