"use client";
import React, { useState } from "react";
import FormCard from "./form-card";
import StaffFormTitle from "./staff-form-title";
import StaffSelectionForm, { Option } from "./staff-selection-form";
import StaffInputField from "./staff-input-field";
import ConditionForm from "./condition-form";

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
  const [condition, setCondition] = useState("GOOD");

  return (
    <div>
      {/* Location */}
      <div className="pb-8">
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

      <div className="flex flex-col gap-10 pb-8 md:flex-row">
        {/* Pole Number */}
        <FormCard>
          <StaffFormTitle isRequired={true} title={"Pole Number"} />
          <StaffInputField placeholder="eg: 1" />
        </FormCard>
        {/* Cluster Number */}
        <FormCard>
          <StaffFormTitle isRequired={true} title={"Cluster Number"} />
          <StaffInputField placeholder="eg: 1" isDisable={true} />
        </FormCard>
      </div>

      {/* Condition */}
      <div className="pb-8">
        <FormCard>
          <StaffFormTitle isRequired={true} title={"Location"} />
          <ConditionForm value={condition} onChange={setCondition} />
        </FormCard>
      </div>
    </div>
  );
}

export default ClusterRecordingForm;
