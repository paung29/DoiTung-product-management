import React from "react";

function StaffSmallTitle({
  title,
  isRequired = true,
}: {
  title: string;
  isRequired?: boolean;
}) {
  return (
    <p className="py-2">
      {title} {isRequired && <span className="text-staff-failed">*</span>}
    </p>
  );
}

export default StaffSmallTitle;
